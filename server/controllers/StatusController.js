import { StatusService } from "../services/StatusService.js";

const msg = 'staus'

export const StatusController = {
    async getAll(req, res) {
        try {

            const result = await StatusService.getAll()

            if (!result.rows) {
                return res.status(404).json({
                    message: `Server could not find a requested ${msg}`
                });
            }

            return res.status(201).json({
                data: result.rows,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: `Server could not read ${msg} because database connection`
            });
        }
    },
};