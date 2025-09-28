import { PostService } from "../services/PostService.js";

export const PostController = {
    async createPost(req, res) {
        try {
            const { title, image, category_id, description, content, status_id } = req.body;

            const result = await PostService.createPost({ title, image, category_id, description, content, status_id })

            return res.status(201).json({
                message: `Created post sucessfully`,
                data: {
                    title,
                    image,
                    category_id,
                    description,
                    content,
                    status_id
                },
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Server could not create post because database connection"
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

            const param = {
                page,
                limit,
                offset,
                category,
                keyword
            }

            const result = await PostService.getAll(param)

            return res.status(201).json({
                data: result,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Server could not read post because database connection"
            });
        }
    },
    async getById(req, res) {
        try {
            const postId = req.params.id;

            const result = await PostService.getById(postId)

            if (!result.rows) {
                return res.status(404).json({
                    message: "Server could not find a requested post"
                });
            }

            return res.status(201).json({
                data: result,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Server could not read post because database connection"
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
                    message: "Server could not find a requested post to update"
                });
            }

            return res.status(201).json({
                message: "Updated post sucessfully"
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Server could not update post because database connection"
            });
        }
    },
    async deleteById(req, res) {
        try {
            const id = req.params.id;

            const result = await PostService.deleteById(id)

            if (result.rowCount === 0) {
                return res.status(404).json({
                    message: "Server could not find a requested post to delete"
                });
            }

            return res.status(201).json({
                message: "Deleted post sucessfully"
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Server could not delete post because database connection"
            });
        }
    },
};