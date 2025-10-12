import connectionPool from "../utils/db.mjs";

export const StatusRepository = {
    async getAll() {
        let query = `
            select 
                * 
            from 
                status
        `;

        return await connectionPool.query(query);
    },
};
