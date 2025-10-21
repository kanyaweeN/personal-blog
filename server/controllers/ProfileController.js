import { ProfileService } from "../services/ProfileService.js";
import cloudinary from "../middlewares/cloudinary.js";
import bcrypt from "bcryptjs";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

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
            const id = req.params.id;

            const result = await ProfileService.getById(id)

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
            const id = req.params.id;
            const { profile_pic } = req.body;
            const publicUrl = await uploadToCloudinary(req.file, "profile-images", "profile", profile_pic);

            const newData = {
                id,
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                bio: req.body.bio,
                ...(publicUrl && { profile_pic: publicUrl }),
            };

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
    async resetPassword(req, res) {
        try {
            const { id } = req.params;
            const { currentPassword, newPassword } = req.body;

            // Validate required fields
            if (!currentPassword || !newPassword) {
                return res.status(400).json({
                    success: false,
                    message: "Current password and new password are required",
                });
            }

            // Validate password length
            if (newPassword.length < 8) {
                return res.status(400).json({
                    success: false,
                    message: "New password must be at least 8 characters long",
                });
            }

            // Get user with password
            const user = await ProfileService.getById(id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
            const userPassword = user.rows[0].password;

            // Verify current password
            const isPasswordValid = await bcrypt.compare(currentPassword, userPassword);

            if (!isPasswordValid) {
                return res.status(400).json({
                    success: false,
                    message: "Current password is incorrect",
                });
            }

            // Check if new password is same as current password
            const isSamePassword = await bcrypt.compare(newPassword, userPassword);

            if (isSamePassword) {
                return res.status(400).json({
                    success: false,
                    message: "New password must be different from current password",
                });
            }

            // Hash new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Update password
            await ProfileService.updatePassword(id, hashedPassword);

            res.status(200).json({
                success: true,
                message: "Password reset successfully",
            });
        } catch (error) {
            console.error("Reset password error:", error);
            res.status(500).json({
                success: false,
                message: "Failed to reset password",
            });
        }
    }
};