import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authentication";
import { useEffect, useRef, useState, useCallback } from "react";
import { useAppToast } from "../useAppToast";
import { ProfileService } from "../../services/profileService";
import { MAX_FILE_SIZE, EMAIL_REGEX } from "../../utils/regex.ts"

const initialize = {
    image: "",
    name: "",
    username: "",
    email: "",
    bio: "",
};

export function useProfile() {
    const { state, fetchUser } = useAuth();
    const navigate = useNavigate();
    const { success } = useAppToast();
    const fileInputRef = useRef(null);

    const [isLoading, setLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [profile, setProfile] = useState(initialize);
    const [error, setError] = useState(initialize);
    const [imageFile, setImageFile] = useState(null);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    const handleUploadClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const validateImageFile = (file) => {
        if (!file.type.startsWith("image/")) {
            return "Please upload a valid image file (JPEG, PNG, GIF, WebP)";
        }
        if (file.size > MAX_FILE_SIZE) {
            return "The file is too large. Please upload an image smaller than 5MB.";
        }
        return "";
    };

    const handleFileChange = async (e) => {
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

        // Clear error ถ้ามี
        setError((prev) => ({
            ...prev,
            image: "",
        }));
    };

    const validateProfileData = () => {
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
    };
    const updateProfile = async () => {
        setLoading(true);
        try {
            const formData = new FormData();

            // เพิ่มข้อมูลทั้งหมดลงใน FormData
            formData.append("name", profile.name);
            formData.append("username", profile.username);
            formData.append("email", profile.email);
            formData.append("bio", profile.bio);
            formData.append("profile_pic", state.user.profilePic);

            console.log("profile_pic", state.user.profilePic);
            // ตรวจสอบว่ามีไฟล์ก่อนเพิ่ม
            // ตรวจสอบไฟล์ที่เลือก
            if (imageFile) {
                console.log("Adding file to FormData:", imageFile);
                formData.append("imageFile", imageFile);
            } else {
                console.warn("No image file selected - skipping file upload");
            }

            await ProfileService.updateById(state.user.id, formData);
            await fetchUser();
            setError((prev) => ({
                ...prev,
                form: "",
            }));
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
            setLoading(false);
        }
    };

    const handleSave = async () => {
        const newErrors = validateProfileData();
        setError(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const success_result = await updateProfile();
            if (success_result) {
                success(
                    "Saved profile",
                    "Your profile has been successfully updated"
                );
            }
        }
    };

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
    return {
        // State
        profile,
        error,
        isLoading,
        isUploading,
        imageFile,

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