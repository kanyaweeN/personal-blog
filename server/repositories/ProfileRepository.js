import connectionPool from "../utils/db.mjs";

export const ProfileRepository = {
    async getAll() {
        let query = `
            SELECT 
                *
            FROM user
        `;
        return await connectionPool.query(query);

    },
    async getById(id) {
        let query = `
            SELECT 
                *
            FROM 
                user
            WHERE
                posts.id = $1
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
};
