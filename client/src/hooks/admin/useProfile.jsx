import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../contexts/authentication.jsx";
import { useAppToast } from "../../hooks/useAppToast.jsx";
import { ProfileService } from "../../services/profileService.js";
import { EMAIL_REGEX } from "../../utils/regex.js";
import { useImageUpload } from "../../hooks/useImageUpload.js";

const initialProfile = { image: "", name: "", username: "", email: "", bio: "" };
const initialError = { image: "", name: "", username: "", email: "", form: "" };

export default function useProfile() {
    const { state, fetchUser } = useAuth();
    const { success } = useAppToast();
    const [isLoading, setIsLoading] = useState(false);
    const [profile, setProfile] = useState(initialProfile);
    const [error, setError] = useState(initialError);

    const {
        fileInputRef,
        imageFile,
        errorImage,
        previewUrl,
        handleUploadClick,
        handleFileChange
    } = useImageUpload();

    useEffect(() => {
        if (errorImage) setError((prev) => ({ ...prev, image: errorImage }));
    }, [errorImage]);

    useEffect(() => {
        if (state?.user) {
            setProfile({
                id: state.user.id,
                image: state.user.avatar || "",
                name: state.user.name || "",
                username: state.user.username || "",
                email: state.user.email || "",
                bio: state.user.bio || ""
            });
        }
    }, [state?.user]);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
        setError((prev) => ({ ...prev, [name]: "" }));
    }, []);

    const validateProfileData = useCallback(() => {
        const newErrors = {};
        if (!profile.name.trim()) newErrors.name = "Please enter your name.";
        if (!profile.username.trim()) newErrors.username = "Please enter your username.";
        if (!profile.email.trim()) newErrors.email = "Please enter your email.";
        else if (!EMAIL_REGEX.test(profile.email))
            newErrors.email = "Email must be a valid email";
        return newErrors;
    }, [profile.name, profile.username, profile.email]);

    const updateProfile = useCallback(async () => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", profile.name);
            formData.append("username", profile.username);
            formData.append("email", profile.email);
            formData.append("bio", profile.bio);
            formData.append("profile_pic", state.user.profilePic);

            if (imageFile) formData.append("imageFile", imageFile);

            await ProfileService.updateById(state.user.id, formData);
            await fetchUser();
            setError(initialError);
            return true;
        } catch (err) {
            console.error("Update error:", err);
            setError((prev) => ({
                ...prev,
                form: err.response?.data?.message || "Failed to update profile",
            }));
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [profile, imageFile, state.user, fetchUser]);

    const handleSave = useCallback(async () => {
        const newErrors = validateProfileData();
        setError(newErrors);
        if (Object.keys(newErrors).length === 0) {
            const isSuccess = await updateProfile();
            if (isSuccess) success("Saved profile", "Your profile has been successfully updated");
        }
    }, [validateProfileData, updateProfile, success]);

    return {
        profile,
        error,
        isLoading,
        imageFile,
        previewUrl,
        fileInputRef,
        handleInputChange,
        handleUploadClick,
        handleFileChange,
        handleSave,
        setProfile,
        setError
    };
}
