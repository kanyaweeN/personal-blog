import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AppButton } from "../../common/AppButton";
import InputField from "../../common/InputField.jsx"
import { useAppToast } from '../../../hooks/useAppToast.jsx';
import Userprofile from "../../common/userprofile.jsx";
import { NavBar } from "../../../components/layouts/NavBar.jsx";
import ProfileHeader from "../components/ProfileHeader.jsx";
import ProfileMenu from "../components/ProfileMenu.jsx";
import AlertResetPassword from "../components/AlertResetPassword.jsx";

function ResetPasswordPage() {
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

    const handleSubmit = (e) => {
        e.preventDefault();

        setisOpenAlert(true);
    };

    return (
        <div className="flex flex-col">
            <NavBar />
            <div className="flex items-center justify-center pt-6 ">

                <div className="flex flex-col items-start ">
                    <ProfileHeader name={profile.name} menuName="Reset password" />

                    {/* Sidebar */}
                    <div className="flex md:flex-row w-full">
                        <ProfileMenu
                            currentPage="reset"
                            onClick={() => navigate("/profile")}
                        />

                        {/* Main content */}
                        <main className="flex-1 flex justify-center items-start ">
                            <div className="bg-brown-200 max-w-lg rounded-xl shadow p-8 space-y-6">

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-5 ">
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

                                    {/* Save button */}
                                    <div className="flex justify-start">
                                        <AppButton
                                            type="submit"
                                            style="dark"
                                        >
                                            Save
                                        </AppButton>
                                    </div>

                                    <AlertResetPassword open={isOpenAlert} onOpenChange={setisOpenAlert} />
                                </form>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordPage