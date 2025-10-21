import { useState } from 'react';

export default function ImageUpload() {
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // ตรวจสอบประเภทของไฟล์
        const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
            alert("Please upload a valid image file (JPEG, PNG, GIF, WebP).");
            return;
        }

        // ตรวจสอบขนาดของไฟล์ (เช่น ขนาดไม่เกิน 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            alert("The file is too large. Please upload an image smaller than 5MB.");
            return;
        }

        // เก็บข้อมูลไฟล์
        setImageFile({ file });

        // setLoading(true);
        // try {
        //     const res = await fetch('/api/upload', {
        //         method: 'POST',
        //         body: formData,
        //         headers: {
        //             Authorization: `Bearer ${localStorage.getItem('token')}`, // JWT token
        //         },
        //     });
        //     const data = await res.json();
        //     setImageUrl(data.url);
        // } catch (error) {
        //     console.error('Upload failed:', error);
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <div>
            <input
                type="file"
                onChange={handleUpload}
                disabled={loading}
            />
            {loading && <p>Uploading...</p>}
            {imageFile && <img src={URL.createObjectURL(imageFile.file)} alt="uploaded" />}
        </div>
    );
}