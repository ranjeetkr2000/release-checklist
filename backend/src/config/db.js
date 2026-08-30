const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS releases (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      release_date TIMESTAMP NOT NULL,
      additional_info TEXT,
      completed_steps BOOLEAN[] DEFAULT '{false,false,false,false,false,false,false}'
    );
  `);
};

module.exports = { pool, initDB };