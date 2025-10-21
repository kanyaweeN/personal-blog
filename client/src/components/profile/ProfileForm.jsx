import { useNavigate } from "react-router-dom";
import { AppButton } from "../../components/button/AppButton.jsx";
import InputField from "../../components/input/InputField.jsx";
import Userprofile from "../avatar/Userprofile.jsx";
import { LoadingPage } from "../loading/LoadingPage.jsx";
import useProfile from "../../hooks/admin/useProfile.jsx";

export default function ProfileForm() {
    const navigate = useNavigate();
    const {
        profile,
        error,
        isLoading,
        previewUrl,
        fileInputRef,
        handleInputChange,
        handleUploadClick,
        handleFileChange,
        handleSave,
    } = useProfile();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleSave();
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
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <AppButton as="span" onClick={handleUploadClick}>
                            Upload profile picture
                        </AppButton>
                        <p className="text-xs text-gray-600">
                            JPG, PNG or GIF. Max size 5MB
                        </p>
                        {error.image && (
                            <p className="text-xs text-red-500">{error.image}</p>
                        )}
                    </div>
                </div>

                <hr className="border-gray-300" />

                {isLoading
                    ? (<LoadingPage />)
                    : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <InputField
                                text="Name"
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                value={profile.name}
                                onChange={handleInputChange}
                                error={error.name}
                                showErrorText={true}
                                required
                            />

                            <InputField
                                text="Username"
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                value={profile.username}
                                onChange={handleInputChange}
                                error={error.username}
                                showErrorText={true}
                                required
                            />

                            <InputField
                                text="Email"
                                type="email"
                                name="email"
                                placeholder="your.email@example.com"
                                value={profile.email}
                                onChange={handleInputChange}
                                error={error.email}
                                showErrorText={true}
                                disabled={true}
                            />

                            {error.form && (
                                <p className="text-sm text-red-500">{error.form}</p>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col justify-end sm:flex-row gap-3 pt-4">
                                <AppButton type="submit" style="dark" disabled={isLoading}>
                                    {isLoading ? "Saving..." : "Save Changes"}
                                </AppButton>
                                <AppButton
                                    type="button"
                                    onClick={() => navigate("/")}
                                    disabled={isLoading}
                                >
                                    Cancel
                                </AppButton>
                            </div>
                        </form>
                    )}
            </div>
        </main>
    );
}