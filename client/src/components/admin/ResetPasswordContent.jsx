import { AppButton } from "../button/AppButton.jsx";
import InputField from "../input/InputField.jsx";
import Alert from "../alert/Alert.jsx";
import { useResetPassword } from "../../hooks/useResetPassword.js";
import { LoadingPage } from "../loading/LoadingPage.jsx";

export default function ResetPasswordContent() {
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
        <main className="flex-1 p-10">
            <header className="flex justify-between items-center mb-5 border-b pb-5">
                <h2 className="text-xl font-bold">Reset password</h2>
                <AppButton
                    style="dark"
                    onClick={handleSave}
                    disabled={isLoading}
                >
                    {isLoading ? "Resetting..." : "Reset password"}
                </AppButton>
            </header>
            {
                isLoading
                    ? <LoadingPage />
                    : (<>
                        {/* Form */}
                        <form className="space-y-5 w-full max-w-[500px]" onSubmit={handleSave}>
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

                            {/* Confirm New Password */}
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
        </main>
    );
}