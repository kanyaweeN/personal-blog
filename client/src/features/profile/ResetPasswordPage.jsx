import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AppButton } from "../../components/button/AppButton.jsx";
import InputField from "../../components/input/InputField.jsx"
import { useAppToast } from '../../hooks/useAppToast.jsx';
import { NavBar } from "../../components/nav/NavBar.jsx";
import ProfileHeader from "../../components/profile/ProfileHeader.jsx";
import ProfileMenu from "../../components/menu/ProfileMenu.jsx";
import Alert from "../../components/alert/Alert.jsx";
import ResetPasswordForm from "../../components/profile/ResetPasswordForm.jsx";
import { useAuth } from "../../contexts/authentication.jsx";

export default function ResetPasswordPage() {
    const { state } = useAuth();
    const navigate = useNavigate();
    const { success } = useAppToast();

    const [isOpenAlert, setisOpenAlert] = useState(false);
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setisOpenAlert(true);
    };

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
                            <ProfileMenu
                                onClick={() => navigate("/profile")}
                            />
                        </aside>

                        {/* Main content */}
                        <ResetPasswordForm />
                    </div>
                </div>
            </div>
            <Alert
                open={isOpenAlert}
                onOpenChange={setisOpenAlert}
                title="Reset password"
                detail="Do you want to reset your password?"
                acceptOnClick={() => navigate("/profile")}
                acceptText="Reset"
                cancelText="Cancel"
            />
        </div>
    );
}