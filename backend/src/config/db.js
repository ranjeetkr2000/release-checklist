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
      completed_steps BOOLEAN[] DEFAULT '{}'
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS steps (
      id SERIAL PRIMARY KEY,
      label VARCHAR(255) NOT NULL,
      sort_order INTEGER NOT NULL
    );
  `);

  const stepCount = await pool.query('SELECT COUNT(*) FROM steps');
  if (parseInt(stepCount.rows[0].count) === 0) {
    const initialSteps = [
      "All relevant GitHub pull requests have been merged",
      "CHANGELOG.md files have been updated",
      "All tests are passing",
      "Releases in Github created",
      "Deployed in demo",
      "Tested thoroughly in demo",
      "Deployed in production"
    ];
    for (let i = 0; i < initialSteps.length; i++) {
      await pool.query('INSERT INTO steps (label, sort_order) VALUES ($1, $2)', [initialSteps[i], i]);
    }
  }
};

module.exports = { pool, initDB };