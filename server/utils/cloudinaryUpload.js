import cloudinary from "../middlewares/cloudinary.js";

/**
 * Upload file to Cloudinary and return secure_url
 * @param {Object} file - multer file object (with buffer)
 * @param {String} folder - folder name in Cloudinary
 * @param {String} prefix - optional public_id prefix
 * @param {String} oldUrl - optional, URL ของไฟล์เก่าที่ต้องการลบก่อน
 */
export const uploadToCloudinary = async (
    file,
    folder = "my-personal-blog",
    prefix = "upload",
    oldUrl = null
) => {
    if (!file) {
        console.log("✗ No file found - skipping file upload");
        return null;
    }

    // ลบไฟล์เก่า ถ้ามี
    if (oldUrl) {
        try {
            // ตัด v{version}/ ออก และดึงเฉพาะ public_id ที่เหลือ
            const match = oldUrl.match(/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+$/);
            if (match && match[1]) {
                const publicId = match[1];
                console.log("🧹 Deleting old image from Cloudinary:", publicId);
                await cloudinary.uploader.destroy(publicId);
            } else {
                console.warn("⚠️ Could not extract public_id from oldUrl:", oldUrl);
            }
        } catch (err) {
            console.warn("⚠️ Failed to delete old image:", err.message);
        }
    }

    // อัปโหลดไฟล์ใหม่
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                public_id: `${prefix}/${Date.now()}_${file.originalname.split('.')[0]}`,
                resource_type: "auto",
            },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary upload error:", error);
                    reject(error);
                } else {
                    console.log("✓ Cloudinary upload success:", result.secure_url);
                    resolve(result.secure_url);
                }
            }
        );

        uploadStream.end(file.buffer);
    });
};
