import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AppButton } from "../../components/button/AppButton.jsx";
import InputField from "../../components/input/InputField.jsx"
import { useAppToast } from '../../hooks/useAppToast.jsx';
import { NavBar } from "../../components/nav/NavBar.jsx";
import ProfileHeader from "../../components/profile/ProfileHeader.jsx";
import ProfileMenu from "../../components/profile/ProfileMenu.jsx";
import Alert from "../../components/alert/Alert.jsx";
import { useResetPassword } from "../../hooks/useResetPassword.js";
import { LoadingDot } from "../loading/LoadingDot.jsx";

export default function ResetPasswordForm() {
    const {
        passwords,
        error,
        isLoading,
        isOpenAlert,
        handleInputChange,
        handleSave,
        handleConfirmReset,
        handleCancelReset,
        setIsOpenAlert,
    } = useResetPassword();

    return (
        <main className="flex-1 flex justify-center items-start ">
            <div className="bg-brown-200 max-w-lg rounded-xl shadow p-8 space-y-6">
                {
                    isLoading
                        ? <LoadingDot />
                        : (<>
                            {/* Form */}
                            <form onSubmit={handleSave} className="space-y-5 ">
                                {/* Current Password */}
                                <div>
                                    <InputField
                                        text="Current Password"
                                        type="password"
                                        name="currentPassword"
                                        placeholder="Enter your current password"
                                        value={passwords.currentPassword}
                                        onChange={handleInputChange}
                                        error={error.currentPassword}
                                        showErrorText={true}
                                        disabled={isLoading}
                                    />
                                </div>

                                {/* New Password */}
                                <div>
                                    <InputField
                                        text="New Password"
                                        type="password"
                                        name="newPassword"
                                        placeholder="Enter your new password"
                                        value={passwords.newPassword}
                                        onChange={handleInputChange}
                                        error={error.newPassword}
                                        showErrorText={true}
                                        disabled={isLoading}
                                    />
                                    <p className="text-xs text-gray-600 mt-1">
                                        Password must be at least 8 characters long
                                    </p>
                                </div>

                                {/* Confirm new password */}
                                <div>
                                    <InputField
                                        text="Confirm New Password"
                                        type="password"
                                        name="confirmNewPassword"
                                        placeholder="Confirm your new password"
                                        value={passwords.confirmNewPassword}
                                        onChange={handleInputChange}
                                        error={error.confirmNewPassword}
                                        showErrorText={true}
                                        disabled={isLoading}
                                    />
                                </div>
                                {/* Form Error */}
                                {error.form && (
                                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                                        <p className="text-sm text-red-600">{error.form}</p>
                                    </div>
                                )}

                                {/* Save button */}
                                <div className="flex justify-start">
                                    <AppButton
                                        type="submit"
                                        style="dark"
                                    >
                                        Save
                                    </AppButton>
                                </div>
                            </form>
                        </>)}

                {/* Confirmation Alert */}
                <Alert
                    open={isOpenAlert}
                    onOpenChange={setIsOpenAlert}
                    title="Reset password"
                    detail="Are you sure you want to reset your password? You will need to use your new password to log in."
                    acceptOnClick={handleConfirmReset}
                    acceptText="Reset"
                    cancelText="Cancel"
                    cancelOnClick={handleCancelReset}
                />
            </div>
        </main >

    );
}