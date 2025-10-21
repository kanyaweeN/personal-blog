import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/authentication";
import { useNavigate } from "react-router-dom";
import { AppButton } from "../../components/button/AppButton.jsx";
import InputField from "../../components/input/InputField.jsx";
import { useAppToast } from "../../hooks/useAppToast.jsx";
import Userprofile from "../../components/avatar/Userprofile.jsx";
import { NavBar } from "../../components/nav/NavBar.jsx";
import ProfileHeader from "../../components/profile/ProfileHeader.jsx";
import ProfileMenu from "../../components/menu/ProfileMenu.jsx";
import ProfileForm from "../../components/profile/ProfileForm.jsx";

export default function ProfilePage() {
    const { state } = useAuth();
    const navigate = useNavigate();
    const { success } = useAppToast();

    const [profile, setProfile] = useState({
        image: "",
        name: "",
        username: "",
        email: "",
    });

    // Initialize profile data from auth state
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
                <ProfileHeader name={profile.name || "User"} menuName="Profile" />

                <div className="flex flex-col md:flex-row gap-6 mt-6 ">
                    {/* Sidebar Menu */}
                    <aside className="w-[200px]">
                        <ProfileMenu />
                    </aside>

                    {/* Main Content */}
                    <ProfileForm />
                </div>
            </div>
        </div>
    );
}