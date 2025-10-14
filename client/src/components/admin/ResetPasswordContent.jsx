import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AppButton } from "../button/AppButton.jsx";
import InputField from "../input/InputField.jsx";
import { useAppToast } from "../../hooks/useAppToast.jsx";
import Alert from "../alert/Alert.jsx";

function ResetPasswordContent() {
    const navigate = useNavigate();
    const { success } = useAppToast();

    const [isOpenAlert, setisOpenAlert] = useState(false);
    const [profile, setProfile] = useState({
        image: "",
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };


    const handleSave = (e) => {
        e.preventDefault();

        setisOpenAlert(true);
    }

    const handleReset = () => {
        //save
        success(
            "Reset password",
            "Password has already been reset."
        )
        setisOpenAlert(false);
    };


    return (
        <main className="flex-1 p-10">
            <header className="flex justify-between items-center mb-5 border-b pb-5">
                <h2 className="text-xl font-bold">
                    Reset password
                </h2>
                <div className="flex gap-2">
                    <AppButton
                        style="dark"
                        onClick={handleSave}
                    >
                        Reset password
                    </AppButton>
                </div>
            </header>

            {/* Form */}
            <form className="space-y-5 w-[500px]">
                {/* Current Password */}
                <div>
                    <InputField
                        text="currentPassword"
                        type="password"
                        name="currentPassword"
                        placeholder="Current Password"
                        value={profile.currentPassword}
                        onChange={handleChange}
                    />
                </div>

                {/* New Password */}
                <div>
                    <InputField
                        text="New Password"
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        value={profile.newPassword}
                        onChange={handleChange}
                    />
                </div>

                {/* Confirm new password */}
                <div>
                    <InputField
                        text="Confirm New Password"
                        type="password"
                        name="confirmNewPassword"
                        placeholder="Confirm New Password"
                        value={profile.confirmNewPassword}
                        onChange={handleChange}
                    />
                </div>
            </form>
            <Alert
                open={isOpenAlert}
                onOpenChange={setisOpenAlert}
                title="Reset password"
                detail="Do you want to reset your password?"
                acceptOnClick={handleReset}
                acceptText="Reset"
                cancelText="Cancel"
            />
        </main>
    );
}

export default ResetPasswordContent