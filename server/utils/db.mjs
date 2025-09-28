import * as pg from "pg";

const { Pool } = pg.default;

const connectionPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // จำเป็นสำหรับ Neon database
  },
});

export default connectionPool;
