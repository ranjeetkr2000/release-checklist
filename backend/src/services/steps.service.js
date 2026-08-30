const { pool } = require('../config/db');

const getAllSteps = async () => {
  const result = await pool.query('SELECT * FROM steps ORDER BY sort_order ASC');
  return result.rows;
};

module.exports = { getAllSteps };