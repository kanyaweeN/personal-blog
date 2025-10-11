import { CommentService } from "../services/CommentService.js";

const msg = 'comment'

export const CommentController = {
    async create(req, res) {
        try {
            const { post_id, comment_text, user_id } = req.body;

            const result = await CommentService.create({ post_id, comment_text, user_id })

            return res.status(201).json({
                message: `Created ${msg} sucessfully`,
                data: result,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: `Server could not create ${msg} because database connection`
            });
        }
    },
    async getByPostId(req, res) {
        try {
            const postId = req.params.id;

            const result = await CommentService.getByPostId(postId)

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
    async updateById(req, res) {
        try {
            const id = req.params.id;
            const newPost = {
                id,
                ...req.body,
            }

            const result = await CommentService.updateById(newPost)

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

            const result = await CommentService.deleteById(id)

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
                message: `Server could not ${msg} comment because database connection`
            });
        }
    },
};