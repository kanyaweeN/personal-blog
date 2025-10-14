import { PostService } from "../services/PostService.js";

const msg = 'post'

export const PostController = {
    async createPost(req, res) {
        try {
            const newPost = {
                ...req.body,
                category_id: Number(req.body.category_id) == 0 ? null : Number(req.body.category_id),
                image: req.body.image || null,
            }

            const result = await PostService.createPost(newPost)

            return res.status(201).json({
                message: `Created ${msg} sucessfully`,
                data: result
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: `Server could not create ${msg} because database connection`
            });
        }
    },
    async getAll(req, res) {
        try {
            const page = Math.max(1, Number(req.query.page) || 1);
            const limit = Math.max(1, Number(req.query.limit) || 6);
            const category = req.query.category || "";
            const keyword = req.query.keyword || "";
            const offset = (page - 1) * limit;
            const statusid = req.query.statusid || 0;

            const param = {
                page,
                limit,
                offset,
                category,
                keyword,
                statusid
            }

            const result = await PostService.getAll(param)

            return res.status(201).json({
                data: result,
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

            const result = await PostService.getById(postId)

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
    async updateLikeById(req, res) {
        try {
            const postId = req.params.id;

            const result = await PostService.updateLikeById(postId)

            return res.status(201).json({
                message: `${msg} liked successfully`,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: `Server could not update ${msg} because database connection`
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

            const result = await PostService.updateById(newPost)

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
    async deleteById(req, res) {
        try {
            const id = req.params.id;

            const result = await PostService.deleteById(id)

            if (result.rowCount === 0) {
                return res.status(404).json({
                    message: `Server could not find a requested ${msg} to delete`
                });
            }

            return res.status(201).json({
                message: `Deleted ${msg} sucessfully`
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: `Server could not delete ${msg} because database connection`
            });
        }
    },
};