import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AppButton } from "../../components/button/AppButton.jsx";
import InputField from "../../components/input/InputField.jsx";
import { useAppToast } from '../../hooks/useAppToast.jsx';
import Userprofile from "../../components/nav/Userprofile.jsx";
import { NavBar } from "../../components/nav/NavBar.jsx";
import ProfileHeader from "../../components/profile/ProfileHeader.jsx";
import ProfileMenu from "../../components/profile/ProfileMenu.jsx";

function ProfilePage() {
    const navigate = useNavigate();
    const { success } = useAppToast();

    const [profile, setProfile] = useState({
        image: "",
        name: "Moodeng ja",
        username: "",
        email: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        success("Saved profile", "Your profile has been successfully updated");
    };

    return (
        <div className="container flex flex-col ">
            <NavBar />
            <div className="flex items-center justify-center pt-6 ">
                <div className="flex flex-col items-start ">
                    <ProfileHeader name={profile.name} menuName="Profile" />

                    {/* Sidebar */}
                    <div className="flex md:flex-row w-full">
                        <ProfileMenu
                            onClick={() => navigate("/profile/resetpassword")}
                        />

                        {/* Main content */}
                        <main className="flex-1 flex justify-center items-start ">
                            <div className="bg-brown-200 max-w-lg rounded-xl shadow p-8 space-y-6">
                                {/* Profile picture */}
                                <div className="flex justify-start items-center gap-5">
                                    <Userprofile
                                        slyte="w-20 h-20"
                                    />
                                    <AppButton>
                                        Upload profile picture
                                    </AppButton>
                                </div>
                                <hr />

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-5 ">
                                    {/* Name */}
                                    <div>
                                        <InputField
                                            text="Name"
                                            type="text"
                                            name="name"
                                            placeholder="Name"
                                            value={profile.name}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* Username */}
                                    <div>
                                        <InputField
                                            text="Username"
                                            type="text"
                                            name="username"
                                            placeholder="username"
                                            value={profile.username}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* Email (disabled) */}
                                    <div>
                                        <InputField
                                            text="Email"
                                            type="email"
                                            placeholder="email"
                                            value={profile.email}
                                            disabled={true}
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
                                </form>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage