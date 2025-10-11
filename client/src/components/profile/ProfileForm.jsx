import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/authentication";
import { useNavigate } from "react-router-dom";
import { AppButton } from "../../components/button/AppButton.jsx";
import InputField from "../../components/input/InputField.jsx";
import { useAppToast } from "../../hooks/useAppToast.jsx";
import Userprofile from "../../components/nav/Userprofile.jsx";
import { ProfileService } from "../../services/profileService.js";

export default function ProfileForm() {
    const { state } = useAuth();
    const navigate = useNavigate();
    const { success } = useAppToast();
    const [isLoading, setLoading] = useState(false);

    const [profile, setProfile] = useState({
        id: 0,
        image: "",
        name: "",
        username: "",
        email: "",
    });

    // Initialize profile data from auth state
    useEffect(() => {
        if (state?.user) {
            setProfile({
                id: state.user.id,
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

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile((prev) => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            await ProfileService.updateById(profile);
            success("Saved profile", "Your profile has been successfully updated");
        } catch (error) {
            console.error("Failed to update profile:", error);
        } finally {
            setLoading(false);
        }
    };

    return (

        <main className="w-full">
            <div className="bg-brown-200 rounded-xl shadow-md p-6 md:p-8 space-y-6">
                {/* Profile Picture Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Userprofile slyte="w-20 h-20" />
                    <div className="flex flex-col gap-2 w-full sm:w-auto">
                        <input
                            type="file"
                            id="profile-upload"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                        <label htmlFor="profile-upload">
                            <AppButton as="span">
                                Upload profile picture
                            </AppButton>
                        </label>
                        <p className="text-xs text-gray-600">
                            JPG, PNG or GIF. Max size 2MB
                        </p>
                    </div>
                </div>

                <hr className="border-gray-300" />

                {/* Profile Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <InputField
                        text="Name"
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={profile.name}
                        onChange={handleChange}
                        required
                    />

                    <InputField
                        text="Username"
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        value={profile.username}
                        onChange={handleChange}
                        required
                    />

                    <InputField
                        text="Email"
                        type="email"
                        name="email"
                        placeholder="your.email@example.com"
                        value={profile.email}
                        onChange={handleChange}
                        disabled={true}
                    />

                    {/* Action Buttons */}
                    <div className="flex flex-col justify-end sm:flex-row gap-3 pt-4">
                        <AppButton
                            type="submit"
                            style="dark"
                        >
                            Save Changes
                        </AppButton>
                        <AppButton
                            type="button"
                            onClick={() => navigate("/")}
                        >
                            Cancel
                        </AppButton>
                    </div>
                </form>
            </div>
        </main>
    );
}