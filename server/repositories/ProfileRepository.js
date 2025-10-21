import connectionPool from "../utils/db.mjs";

export const ProfileRepository = {
    async getAll() {
        let query = `
            SELECT 
                *
            FROM 
                users
        `;
        return await connectionPool.query(query);

    },
    async getById(id) {
        let query = `
            SELECT 
                *
            FROM 
                users
            WHERE
                id = $1
        `;

        return await connectionPool.query(query, [id]);
    },
    async updateById(newData) {
        let query = `
            update 
                users
            set 
                username = $2,
                name = $3,
                profile_pic = $4,
                email = $5,
                bio = $6
            where 
                id = $1
        `;
        return await connectionPool.query(query
            , [
                newData.id,
                newData.username,
                newData.name,
                newData.profile_pic,
                newData.email,
                newData.bio
            ]);
    },
    async updatePassword(id, hashedPassword) {
        const query = `
            update 
                users
            set 
                password = $1
            where 
                id = $2
            returning id
        `;

        const result = await connectionPool.query(query,
            [
                hashedPassword,
                id
            ]);
        return result.rows[0];
    },
};
