import connectionPool from "../utils/db.mjs";

export const CommentRepository = {
    async create(postData) {

        let query = `
            insert into comments
                (
                    post_id, 
                    comment_text, 
                    user_id, 
                    created_at
                )
            values 
                ($1, $2, $3, $4)
            RETURNING id
        `;
        return await connectionPool.query(
            query
            , [
                postData.post_id,
                postData.comment_text,
                postData.user_id,
                postData.created_at
            ]);
    },
    async getAll() {
        let query = `
            select 
                * 
            from 
                comments
        `;

        return await connectionPool.query(query);
    },
    async getByPostId(id) {
        let query = `
            SELECT 
                comments.comment_text,
                comments.created_at,
                users.name as author,
                users.profile_pic as author_img
            FROM 
                comments
                inner join users on users.id = comments.user_id
            WHERE
                comments.post_id = $1
            order by
                comments.created_at desc
        `;

        return await connectionPool.query(query, [id]);
    },
    async updateLikeById(id) {
        let query = `
            update 
                posts 
            set 
                likes_count = likes_count + 1 
            where 
                id = $1 
            RETURNING *
        `;

        return await connectionPool.query(query, [id]);
    },
    async updateById(newPost) {
        let query = `
            update 
                posts
            set 
                title = $2,
                image = $3,
                category_id = $4,
                description = $5,
                content = $6,
                status_id = $7,
                date = $8
            where 
                id = $1
        `;
        return await connectionPool.query(query
            , [
                newPost.id,
                newPost.title,
                newPost.image,
                newPost.category_id,
                newPost.description,
                newPost.content,
                newPost.status_id,
                newPost.created_at
            ]);
    },
    async deleteById(id) {
        let query = `
            delete from
                posts
            where 
                id = $1
        `;
        return await connectionPool.query(query, [id]);
    },
};
