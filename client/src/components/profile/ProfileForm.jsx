import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useAuth } from "@/contexts/authentication";
import { useNavigate } from "react-router-dom";
import { AppButton } from "../../components/button/AppButton.jsx";
import InputField from "../../components/input/InputField.jsx";
import { useAppToast } from "../../hooks/useAppToast.jsx";
import Userprofile from "../../components/nav/Userprofile.jsx";
import { ProfileService } from "../../services/profileService.js";
import { LoaderCircle } from "lucide-react";
import { LoadingDot } from "../loading/LoadingDot.jsx";
import { MAX_FILE_SIZE } from "../../utils/regex.js"
const initialize = {
    id: 0,
    image: "",
    name: "",
    username: "",
    email: "",
    bio: "",
};
export default function ProfileForm() {
    const { state } = useAuth();
    const navigate = useNavigate();
    const { success } = useAppToast();
    const [isLoading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);
    const [error, setError] = useState(initialize);

    const [profile, setProfile] = useState(initialize);
    // ✅ สร้าง preview URL จาก File object โดยตรง
    const previewUrl = useMemo(() => {
        if (imageFile && imageFile instanceof File) {
            return URL.createObjectURL(imageFile);
        }
        return null;
    }, [imageFile]);

    // Cleanup object URL เมื่อ component unmount หรือ imageFile เปลี่ยน
    useMemo(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);
    // Initialize profile data from auth state
    useEffect(() => {
        if (state?.user) {
            setProfile({
                id: state.user.id,
                image: state.user.avatar || "",
                name: state.user.name || "",
                username: state.user.username || "",
                email: state.user.email || "",
                bio: state.user.bio || "",
            });
        }
    }, [state?.user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const validateImageFile = (file) => {
        if (!file.type.startsWith("image/")) {
            return "Please upload a valid image file (JPEG, PNG, GIF, WebP)";
        }
        if (file.size > MAX_FILE_SIZE) {
            return "The file is too large. Please upload an image smaller than 5MB.";
        }
        return "";
    };

    const handleUploadClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const validationError = validateImageFile(file);
        if (validationError) {
            setError((prev) => ({
                ...prev,
                image: validationError,
            }));
            return;
        }
        setImageFile(file);

        // Clear error ถ้ามี
        setError((prev) => ({
            ...prev,
            image: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const formData = new FormData();

            // เพิ่มข้อมูลทั้งหมดลงใน FormData
            formData.append("name", profile.name);
            formData.append("username", profile.username);
            formData.append("email", profile.email);
            formData.append("bio", profile.bio);
            formData.append("profile_pic", state.user.profilePic);

            console.log("profile_pic", state.user.profilePic);
            // ตรวจสอบว่ามีไฟล์ก่อนเพิ่ม
            // ตรวจสอบไฟล์ที่เลือก
            if (imageFile) {
                console.log("Adding file to FormData:", imageFile);
                formData.append("imageFile", imageFile);
            } else {
                console.warn("No image file selected - skipping file upload");
            }

            await ProfileService.updateById(state.user.id, formData);
            // await fetchUser();
            setError((prev) => ({
                ...prev,
                form: "",
            }));
            setImageFile(null);
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
                    <Userprofile
                        src={previewUrl || profile.image}
                        style="w-20 h-20"
                    />
                    <div className="flex flex-col gap-2 w-full sm:w-auto">
                        <input
                            ref={fileInputRef}
                            type="file"
                            id="profile-upload"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <label htmlFor="profile-upload">
                            <AppButton
                                as="span"
                                onClick={handleUploadClick}
                            >
                                Upload profile picture
                            </AppButton>
                        </label>
                        <p className="text-xs text-gray-600">
                            JPG, PNG or GIF. Max size 2MB
                        </p>
                    </div>
                </div>

                <hr className="border-gray-300" />

                {isLoading ? <LoadingDot />
                    :
                    <>
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
                    </>}
            </div>
        </main>
    );
}