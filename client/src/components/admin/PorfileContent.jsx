import { AppButton } from '../button/AppButton.jsx';
import InputField from '../input/InputField.jsx';
import TextArea from '../input/TextArea.jsx';
import Userprofile from '../nav/Userprofile.jsx';
import { useProfile } from '../../hooks/admin/useProfile.jsx';
import { useMemo } from 'react';
import { LoaderCircle } from 'lucide-react';
import { LoadingDot } from '../loading/LoadingDot.jsx';

export default function PorfileContent() {
    const {
        success,
        error,
        isLoading,
        isUploading,
        imageFile,
        profile,
        setProfile,
        previewImage,
        setPreviewImage,
        fileInputRef,
        handleInputChange,
        handleUploadClick,
        handleFileChange,
        handleSave,
        updateData,
        fetchUser,
    } = useProfile();

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

    return (
        <main className="flex-1 p-10">
            {/* Header */}
            <header className="flex justify-between items-center mb-5 border-b pb-5">
                <h2 className="text-xl font-bold">
                    Profile
                </h2>
                <div className="flex gap-2">
                    <AppButton
                        onClick={handleSave}
                        style='dark'
                        disabled={isUploading}
                    >
                        Save
                    </AppButton>
                </div>
            </header>

            {/* Thumbnail */}
            {isLoading
                ? <LoadingDot />
                : <>
                    <form className="text-brown-400 space-y-4">
                        <div className="flex items-center gap-3">
                            <div>
                                <Userprofile
                                    src={previewUrl || profile.image}
                                    style="w-20 h-20"
                                />
                            </div>
                            <div>
                                {/* Hidden file input*/}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleUploadClick();
                                    }}
                                    disabled={isUploading}
                                    className="px-7 py-2 text-sm bg-white text-brown-700 border border-brown-300 hover:bg-brown-50 hover:border-brown-400 rounded-full transition-colors cursor-pointer"
                                >
                                    {isUploading ? 'Uploading...' : 'Upload profile picture'}
                                </button>
                                {error.image && (
                                    <p className="text-red-500 text-sm mt-1">{error.image}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="name" className="text-sm">name</label>
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

                        <div>
                            <label htmlFor="title" className="text-sm">Username</label>
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

                        <div>
                            <label htmlFor="email" className="text-sm">Email</label>
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

                        <div>
                            <label htmlFor="bio" className="text-sm">Bio (max 120 letters)</label>
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
                    </form>
                </>
            }
        </main>
    );
}
