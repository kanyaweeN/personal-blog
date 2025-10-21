import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useAuth } from "../../contexts/authentication.jsx";
import { useAppToast } from "../../hooks/useAppToast.jsx";
import { ProfileService } from "../../services/profileService.js";
import { MAX_FILE_SIZE, EMAIL_REGEX } from "../../utils/regex.js";

const initialProfile = {
    image: "",
    name: "",
    username: "",
    email: "",
    bio: "",
};

const initialError = {
    image: "",
    name: "",
    username: "",
    email: "",
    form: "",
};

export default function useProfile() {
    const { state, fetchUser } = useAuth();
    const { success } = useAppToast();
    const fileInputRef = useRef(null);

    const [isLoading, setIsLoading] = useState(false);
    const [profile, setProfile] = useState(initialProfile);
    const [error, setError] = useState(initialError);
    const [imageFile, setImageFile] = useState(null);

    // Preview URL for selected image
    const previewUrl = useMemo(() => {
        if (imageFile instanceof File) {
            return URL.createObjectURL(imageFile);
        }
        return null;
    }, [imageFile]);

    // Cleanup object URL
    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    // Initialize profile from user data
    useEffect(() => {
        if (state?.user) {
            setProfile({
                id: state.user.id,
                image: state.user.avatar || "",
                name: state.user.name || "",
                username: state.user.username || "",
                email: state.user.email || "",
                bio: state.user.bio || "",
            });
        }
    }, [state?.user]);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user types
        setError((prev) => ({
            ...prev,
            [name]: "",
        }));
    }, []);

    const handleUploadClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const validateImageFile = useCallback((file) => {
        if (!file.type.startsWith("image/")) {
            return "Please upload a valid image file (JPEG, PNG, GIF, WebP)";
        }
        if (file.size > MAX_FILE_SIZE) {
            return "The file is too large. Please upload an image smaller than 5MB.";
        }
        return "";
    }, []);

    const handleFileChange = useCallback((e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const validationError = validateImageFile(file);
        if (validationError) {
            setError((prev) => ({
                ...prev,
                image: validationError,
            }));
            return;
        }

        setImageFile(file);
        setError((prev) => ({
            ...prev,
            image: "",
        }));
    }, [validateImageFile]);

    const validateProfileData = useCallback(() => {
        const newErrors = {};

        if (!profile.name.trim()) {
            newErrors.name = "Please enter your name.";
        }

        if (!profile.username.trim()) {
            newErrors.username = "Please enter your username.";
        }

        if (!profile.email.trim()) {
            newErrors.email = "Please enter your email.";
        } else if (!EMAIL_REGEX.test(profile.email)) {
            newErrors.email = "Email must be a valid email";
        }

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

            if (imageFile) {
                formData.append("imageFile", imageFile);
            }

            await ProfileService.updateById(state.user.id, formData);
            await fetchUser();

            setError(initialError);
            setImageFile(null);
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
            if (isSuccess) {
                success(
                    "Saved profile",
                    "Your profile has been successfully updated"
                );
            }
        }
    }, [validateProfileData, updateProfile, success]);

    return {
        // State
        profile,
        error,
        isLoading,
        imageFile,
        previewUrl,

        // Refs
        fileInputRef,

        // Handlers
        handleInputChange,
        handleUploadClick,
        handleFileChange,
        handleSave,

        // Utilities
        setProfile,
        setError,
    };
}