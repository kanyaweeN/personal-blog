import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { NavBar } from "../../components/nav/NavBar.jsx";
import ProfileHeader from "../../components/profile/ProfileHeader.jsx";
import ProfileMenu from "../../components/menu/ProfileMenu.jsx";
import ResetPasswordForm from "../../components/profile/ResetPasswordForm.jsx";
import { useAuth } from "../../contexts/authentication.jsx";

export default function ResetPasswordPage() {
    const { state } = useAuth();
    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        image: "",
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    useEffect(() => {
        if (state?.user) {
            setProfile({
                image: state.user.avatar || "",
                name: state.user.name || "",
                username: state.user.username || "",
                email: state.user.email || "",
            });
        }
    }, [state?.user]);

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />
            <div className="container mx-auto px-4 py-6">

                <div className="flex flex-col items-start ">
                    <ProfileHeader name={profile.name} menuName="Reset password" />

                    {/* Sidebar */}
                    <div className="flex md:flex-row w-full">
                        {/* Sidebar Menu */}
                        <aside className="w-[200px]">
                            <ProfileMenu />
                        </aside>

                        {/* Main content */}
                        <ResetPasswordForm />
                    </div>
                </div>
            </div>
        </div>
    );
}