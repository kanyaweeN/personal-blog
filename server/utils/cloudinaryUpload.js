import cloudinary from "../middlewares/cloudinary.js";

/**
 * Upload file to Cloudinary and return secure_url
 * @param {Object} file - multer file object (with buffer)
 * @param {String} folder - folder name in Cloudinary
 * @param {String} prefix - optional public_id prefix
 */
export const uploadToCloudinary = (file, folder = "my-personal-blog", prefix = "upload") => {
    return new Promise((resolve, reject) => {
        if (!file) {
            console.log("✗ No file found - skipping file upload");
            return resolve(null);
        }

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
