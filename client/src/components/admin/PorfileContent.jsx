import { AppButton } from '../button/AppButton.jsx';
import InputField from '../input/InputField.jsx';
import TextArea from '../input/TextArea.jsx';
import Userprofile from '../avatar/Userprofile.jsx';
import { LoadingPage } from '../loading/LoadingPage.jsx';
import useProfile from '../../hooks/admin/useProfile.jsx';

export default function ProfileContent() {
    const {
        error,
        isLoading,
        profile,
        previewUrl,
        fileInputRef,
        handleInputChange,
        handleUploadClick,
        handleFileChange,
        handleSave,
    } = useProfile();

    return (
        <main className="flex-1 p-10">
            {/* Header */}
            <header className="flex justify-between items-center mb-5 border-b pb-5">
                <h2 className="text-xl font-bold">Profile</h2>
                <AppButton
                    onClick={handleSave}
                    style="dark"
                    disabled={isLoading}
                >
                    {isLoading ? "Saving..." : "Save"}
                </AppButton>
            </header>

            {isLoading
                ? (<LoadingPage />) : (
                    <form className="text-brown-400 space-y-4">
                        {/* Profile Picture */}
                        <div className="flex items-center gap-3">
                            <Userprofile
                                src={previewUrl || profile.image}
                                style="w-20 h-20"
                            />
                            <div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <button
                                    type="button"
                                    onClick={handleUploadClick}
                                    disabled={isLoading}
                                    className="px-7 py-2 text-sm bg-white text-brown-700 border border-brown-300 hover:bg-brown-50 hover:border-brown-400 rounded-full transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Upload profile picture
                                </button>
                                {error.image && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {error.image}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="text-sm">
                                Name
                            </label>
                            <InputField
                                id="name"
                                name="name"
                                placeholder="Name"
                                value={profile.name}
                                onChange={handleInputChange}
                                error={error.name}
                                showErrorText={true}
                            />
                        </div>

                        {/* Username Field */}
                        <div>
                            <label htmlFor="username" className="text-sm">
                                Username
                            </label>
                            <InputField
                                id="username"
                                name="username"
                                placeholder="Username"
                                value={profile.username}
                                onChange={handleInputChange}
                                error={error.username}
                                showErrorText={true}
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="text-sm">
                                Email
                            </label>
                            <InputField
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={profile.email}
                                onChange={handleInputChange}
                                error={error.email}
                                showErrorText={true}
                            />
                        </div>

                        {/* Bio Field */}
                        <div>
                            <label htmlFor="bio" className="text-sm">
                                Bio (max 120 letters)
                            </label>
                            <TextArea
                                id="bio"
                                name="bio"
                                placeholder="Bio"
                                maxLength={120}
                                rows={3}
                                value={profile.bio}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Form Error */}
                        {error.form && (
                            <p className="text-red-500 text-sm">{error.form}</p>
                        )}
                    </form>
                )}
        </main>
    );
}