import { useState, useCallback } from "react";
import { useAuth } from "../contexts/authentication";
import { useAppToast } from "../hooks/useAppToast.jsx";
import { ProfileService } from "../services/profileService.js";
import { PASSWORD_MIN_LENGTH } from "../utils/regex";

const initialPasswordState = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
};

const initialError = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    form: "",
};

export function useResetPassword() {
    const { state } = useAuth();
    const { success, error: toastError } = useAppToast();

    const [isLoading, setIsLoading] = useState(false);
    const [isOpenAlert, setIsOpenAlert] = useState(false);
    const [passwords, setPasswords] = useState(initialPasswordState);
    const [error, setError] = useState(initialError);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setPasswords((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user types
        setError((prev) => ({
            ...prev,
            [name]: "",
        }));
    }, []);

    const validatePasswords = useCallback(() => {
        const newErrors = {};

        if (!passwords.currentPassword) {
            newErrors.currentPassword = "Please enter your current password.";
        }

        if (!passwords.newPassword) {
            newErrors.newPassword = "Please enter your new password.";
        } else if (passwords.newPassword.length < PASSWORD_MIN_LENGTH) {
            newErrors.newPassword = `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`;
        }

        if (!passwords.confirmNewPassword) {
            newErrors.confirmNewPassword = "Please confirm your new password.";
        } else if (passwords.newPassword !== passwords.confirmNewPassword) {
            newErrors.confirmNewPassword = "Passwords do not match.";
        }

        if (passwords.currentPassword && passwords.newPassword &&
            passwords.currentPassword === passwords.newPassword) {
            newErrors.newPassword = "New password must be different from current password.";
        }

        return newErrors;
    }, [passwords]);

    const resetPassword = useCallback(async () => {
        setIsLoading(true);
        try {
            await ProfileService.resetPassword(state.user.id, {
                currentPassword: passwords.currentPassword,
                newPassword: passwords.newPassword,
            });

            // Clear ข้อมูลหลังสำเร็จ
            setError(initialError);
            setPasswords(initialPasswordState);
            setIsOpenAlert(false);

            success(
                "Reset password",
                "Password has been reset successfully."
            );

            return true;
        } catch (err) {
            console.error("Reset password error:", err);

            // ดึง error message และ status code
            const errorMessage = err.response?.data?.message || "Failed to reset password";
            const statusCode = err.response?.status;

            // จัดการ error ตาม status code
            if (statusCode === 401) {
                // Current password ไม่ถูกต้อง
                setError((prev) => ({
                    ...prev,
                    form: errorMessage,
                }));
            } else if (statusCode === 400) {
                // Validation error (password ซ้ำ หรือสั้นเกินไป)
                setError((prev) => ({
                    ...prev,
                    form: errorMessage,
                }));
            } else {
                // Server error อื่นๆ
                setError((prev) => ({
                    ...prev,
                    form: errorMessage,
                }));
            }

            // ปิด alert dialog
            setIsOpenAlert(false);

            // แสดง toast notification
            toastError(
                "Reset password failed",
                errorMessage
            );

            return false;
        } finally {
            setIsLoading(false);
        }
    }, [passwords, state.user?.id, success, toastError]);

    const handleSave = useCallback((e) => {
        e.preventDefault();

        const newErrors = validatePasswords();
        setError(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setIsOpenAlert(true);
        }
    }, [validatePasswords]);

    const handleConfirmReset = useCallback(async () => {
        await resetPassword();
    }, [resetPassword]);

    const handleCancelReset = useCallback(() => {
        setIsOpenAlert(false);
    }, []);

    return {
        // State
        passwords,
        error,
        isLoading,
        isOpenAlert,

        // Handlers
        handleInputChange,
        handleSave,
        handleConfirmReset,
        handleCancelReset,
        setIsOpenAlert,
    };
}