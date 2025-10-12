import { ProfileService } from "../services/ProfileService.js";

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

            return res.status(201).json({
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

            return res.status(201).json({
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
            const newDate = {
                id,
                ...req.body,
            }

            const result = await ProfileService.updateById(newDate)

            if (result.rowCount === 0) {
                return res.status(404).json({
                    message: `Server could not find a requested ${msg} to update`
                });
            }

            return res.status(201).json({
                message: `Updated ${msg} sucessfully`
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: `Server could not update ${msg} because database connection`
            });
        }
    },
};