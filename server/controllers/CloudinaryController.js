
export const CloudinaryController = {
    async create(req, res) {
        // try {
        //     if (!req.file || !req.file.buffer) {
        //         return res.status(400).json({ error: "No file uploaded" });
        //     }

        //     const result = await new Promise((resolve, reject) => {
        //         const uploadStream = cloudinary.uploader.upload_stream(
        //             { folder: "personal_blog_uploads" },
        //             (error, result) => {
        //                 if (error) reject(error);
        //                 else resolve(result);
        //             }
        //         );
        //         uploadStream.end(req.file.buffer);
        //     });

        //     return res.json({ url: result.secure_url, publicId: result.public_id });
        // } catch (error) {
        //     return res.status(500).json({ error: error.message });
        // }
    },
};