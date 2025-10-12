import connectionPool from "../utils/db.mjs";

export const CategoriesRepository = {
    async getAll() {
        let query = `
            select 
                * 
            from 
                categories
        `;

        return await connectionPool.query(query);
    },
};
