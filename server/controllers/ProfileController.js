import { ProfileService } from "../services/ProfileService.js";
import cloudinary from "../middlewares/cloudinary.js";

const msg = 'profile'

export const ProfileController = {
    async getAll(req, res) {
        try {
            const result = await ProfileService.getAll()

            if (!result.rows) {
                return res.status(404).json({
                    message: `Server could not find a requested ${msg}`
                });
            }

            return res.status(200).json({
                data: result.rows[0],
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: `Server could not read ${msg} because database connection`
            });
        }
    },
    async getById(req, res) {
        try {
            const postId = req.params.id;

            const result = await ProfileService.getById(postId)

            if (!result.rows) {
                return res.status(404).json({
                    message: `Server could not find a requested ${msg}`
                });
            }

            return res.status(200).json({
                data: result.rows[0],
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: `Server could not read ${msg} because database connection`
            });
        }
    },
    async updateById(req, res) {
        try {
            console.log("=== Backend Request ===");
            console.log("Files:", req.files);
            console.log("Body:", req.body);
            console.log("imageFile:", req.body.imageFile);

            const id = req.params.id;
            let publicUrl = null;

            // 1) ตรวจสอบและอัปโหลดไฟล์
            if (req.file) {
                console.log("✓ File found!");
                const file = req.file;
                console.log("File details:", {
                    name: file.originalname,
                    size: file.size,
                    type: file.mimetype
                });

                const uploadResult = await new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        {
                            folder: "my-personal-blog",
                            public_id: `profile/${Date.now()}_${file.originalname.split('.')[0]}`,
                            resource_type: "auto",
                        },
                        (error, result) => {
                            if (error) {
                                console.error("Cloudinary error:", error);
                                reject(error);
                            } else {
                                console.log("✓ Cloudinary upload success:", result.secure_url);
                                resolve(result);
                            }
                        }
                    );

                    // multer เก็บไฟล์ใน buffer
                    uploadStream.end(file.buffer);
                });

                publicUrl = uploadResult.secure_url;
            } else {
                console.log("✗ No file found - skipping file upload");
            }

            // 2) เตรียมข้อมูลสำหรับอัปเดต
            const newData = {
                id,
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                bio: req.body.bio,
                profile_pic: req.body.profile_pic,
            };

            // เพิ่ม profile_pic เฉพาะเมื่อมีการอัปโหลดไฟล์ใหม่
            if (publicUrl) {
                newData.profile_pic = publicUrl;
            }
            console.log("Updating profile with data:", newData);

            // 3) อัปเดตข้อมูลในฐานข้อมูล
            const result = await ProfileService.updateById(newData);

            if (result.rowCount === 0) {
                return res.status(404).json({
                    message: `Server could not find a requested ${msg} to update`
                });
            }

            return res.status(200).json({
                message: `Updated ${msg} successfully`,
                data: {
                    id,
                    profile_pic: publicUrl || null
                }
            });
        } catch (error) {
            console.error("Update profile error:", error);
            return res.status(500).json({
                message: error.message || `Server could not update ${msg}`
            });
        }
    },
};