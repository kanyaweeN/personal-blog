import { ProfileService } from "../services/ProfileService.js";

export const ProfileController = {
    async getAll(req, res) {
        try {
            const result = await ProfileService.getAll()

            if (!result.rows) {
                return res.status(404).json({
                    message: "Server could not find a requested Profile"
                });
            }

            return res.status(201).json({
                data: result.rows[0],
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Server could not read Profile because database connection"
            });
        }
    },
    async getById(req, res) {
        try {
            const postId = req.params.id;

            const result = await ProfileService.getById(postId)

            if (!result.rows) {
                return res.status(404).json({
                    message: "Server could not find a requested Profile"
                });
            }

            return res.status(201).json({
                data: result.rows[0],
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Server could not read Profile because database connection"
            });
        }
    },
    async updateById(req, res) {
        try {
            const id = req.params.id;
            const newPost = {
                id,
                ...req.body,
            }

            const result = await ProfileService.updateById(newPost)

            if (result.rowCount === 0) {
                return res.status(404).json({
                    message: "Server could not find a requested Profile to update"
                });
            }

            return res.status(201).json({
                message: "Updated Profile sucessfully"
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Server could not update Profile because database connection"
            });
        }
    },
};