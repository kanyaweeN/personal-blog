import connectionPool from "../utils/db.mjs";

export const PostRepository = {
    async createPost(postData) {
        console.log(postData);

        let query = `
            insert into posts
                (
                    title, 
                    image, 
                    category_id, 
                    description, 
                    content, 
                    status_id, 
                    likes_count, 
                    date
                )
            values 
                ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
        `;
        return await connectionPool.query(
            query
            ,
            [
                postData.title,
                postData.image,
                postData.category_id,
                postData.description,
                postData.content,
                postData.status_id,
                postData.likes_count,
                postData.created_at
            ]);
    },
    async getAll(param) {
        const { page, limit, offset, category, keyword } = param;

        //query condition
        let conditions = [];
        let values = [];
        let paramIndex = 1; // ใช้สำหรับนับ $1, $2, $3

        if (category) {
            conditions.push(`
                categories.name = $${paramIndex}`
            );
            values.push(`${category}`);
            paramIndex++;
        }

        if (keyword) {
            conditions.push(`
                (title ILIKE $${paramIndex} OR 
                content ILIKE $${paramIndex} OR 
                description ILIKE $${paramIndex})
            `);
            values.push(`%${keyword}%`);
            paramIndex++;
        }

        //query from
        let queryFrom = `
            FROM 
                posts
                inner join categories on categories.id = posts.category_id
                inner join statuses on statuses.id = posts.status_id
            WHERE 
                posts.status_id = 2
        `;

        //query post all
        let querySelectAll = `
            SELECT 
                *
        `;

        if (conditions.length > 0) {
            querySelectAll += queryFrom + " AND " + conditions.join(" AND ");
        }

        querySelectAll += ` ORDER BY date DESC 
            LIMIT $${paramIndex} 
            OFFSET $${paramIndex + 1}`;
        values.push(limit, offset);

        // console.log("result", querySelectAll, values);
        const result = await connectionPool.query(querySelectAll, values);

        //query post count
        let queryCount = `
            SELECT 
                count(*)
        `;

        if (conditions.length > 0) {
            queryCount += queryFrom + " AND " + conditions.join(" AND ");
        }
        let countValues = values.slice(0, -2);

        // console.log("countResult", queryCount, countValues);
        const countResult = await connectionPool.query(queryCount, countValues);

        const totalPosts = Number(countResult.rows[0].count);

        const results = {
            totalPosts,
            totalPages: Math.ceil(totalPosts / limit),
            currentPage: page,
            limit: limit,
            posts: result.rows,
        };

        // เช็คว่ามีหน้าถัดไปหรือไม่
        if (offset + limit < totalPosts) {
            results.nextPage = page + 1;
        }
        // เช็คว่ามีหน้าก่อนหน้าหรือไม่
        if (offset > 0) {
            results.previousPage = page - 1;
        }

        return results;
    },
    async getById(id) {
        let query = `
            SELECT 
                *
            FROM 
                posts
            WHERE
                id = $1
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
