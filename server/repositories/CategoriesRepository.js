import connectionPool from "../utils/db.mjs";

export const CategoriesRepository = {
    async create(newData) {
        let query = `
            insert into categories
                (name) 
            values
                ($1)
        `;

        return await connectionPool.query(query,
            [
                newData.name
            ]);
    },
    async getAll() {
        let query = `
            select 
                * 
            from 
                categories
        `;

        return await connectionPool.query(query);
    }, async getById(id) {
        let query = `
            select 
                * 
            from 
                categories
            where 
            id = $1
        `;

        return await connectionPool.query(query, [id]);
    }, async updateById(newData) {
        let query = `
            update 
                categories 
            set 
                name = $2
            where 
                id = $1
        `;

        return await connectionPool.query(query,
            [
                newData.id,
                newData.name
            ]);
    },
    async deleteById(id) {
        let query = `
            update 
                posts 
            set 
                category_id = null
            where 
                category_id = $1
        `;

        await connectionPool.query(query,
            [
                id
            ]);

        let queryDelete = `
            delete from
                categories 
            where 
                id = $1
        `;
        return await connectionPool.query(queryDelete,
            [
                id
            ]);
    },
};
