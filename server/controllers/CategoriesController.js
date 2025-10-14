import { CategoriesService } from "../services/CategoriesService.js";

const msg = 'categories'

export const CategoriesController = {
    async create(req, res) {
        try {
            const { name } = req.body;

            const result = await CategoriesService.create({ name })

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
    async getAll(req, res) {
        try {

            const result = await CategoriesService.getAll()

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
    async getById(req, res) {
        try {
            const id = req.params.id;

            const result = await CategoriesService.getById(id)

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
            const { name } = req.body;

            const result = await CategoriesService.updateById({ id, name })

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
    async deleteById(req, res) {
        try {
            const id = req.params.id;

            const result = await CategoriesService.deleteById(id)

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