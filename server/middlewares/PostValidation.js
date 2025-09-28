export const PostValidation = {
    createProduct(req, res, next) {
        const body = req.body;

        if (!body || Object.keys(body).length === 0) {
            return res.status(400).json({
                message: "Server could not create post because there are missing data from client"
            })
        }

        if (!body.title) {
            return res.status(400).json({
                message: "Title is required.",
            })
        }

        if (!body.image) {
            return res.status(400).json({
                message: "Image is required.",
            })
        }

        if (!body.content) {
            return res.status(400).json({
                message: "Content is required.",
            })
        }

        next();
    },
    updateProduct(req, res, next) {
        const body = req.body;

        if (!body || Object.keys(body).length === 0) {
            return res.status(400).json({
                message: "Server could not create post because there are missing data from client"
            })
        }

        if (!body.title) {
            return res.status(400).json({
                message: "Title is required.",
            })
        } else if (typeof body.title !== "string") {
            return res.status(400).json({
                message: "Title must be a string.",
            })
        }

        if (!body.image) {
            return res.status(400).json({
                message: "Image is required.",
            })
        } else if (typeof body.image !== "string") {
            return res.status(400).json({
                message: "Image must be a string.",
            })
        }

        if (!body.category_id) {
            return res.status(400).json({
                message: "Category_id is required.",
            })
        } else if (typeof body.category_id !== "number") {
            return res.status(400).json({
                message: "Category_id must be a number.",
            })
        }

        if (!body.description) {
            return res.status(400).json({
                message: "Description is required.",
            })
        } else if (typeof body.description !== "string") {
            return res.status(400).json({
                message: "Description must be a string.",
            })
        }

        if (!body.content) {
            return res.status(400).json({
                message: "Content is required.",
            })
        } else if (typeof body.content !== "string") {
            return res.status(400).json({
                message: "Content must be a string.",
            })
        }

        if (!body.status_id) {
            return res.status(400).json({
                message: "Status_id is required.",
            })
        } else if (typeof body.status_id !== "number") {
            return res.status(400).json({
                message: "Status_id must be a number.",
            })
        }

        next();
    }
}