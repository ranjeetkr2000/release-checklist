const { pool } = require('../config/db');
const stepService = require('./steps.service');

const formatRelease = (row, dbSteps) => {
  const completedSteps = row.completed_steps || [];
  const completedCount = completedSteps.filter(Boolean).length;
  
  let status = 'Planned';
  if (completedCount > 0 && completedCount === dbSteps.length) status = 'Done';
  else if (completedCount > 0) status = 'Ongoing';

  return {
    id: row.id,
    name: row.name,
    release_date: row.release_date,
    additional_info: row.additional_info,
    status,
    steps: dbSteps.map((stepObj, index) => ({
      id: stepObj.id,
      label: stepObj.label,
      completed: Boolean(completedSteps[index])
    }))
  };
};

const getAllReleases = async () => {
  const dbSteps = await stepService.getAllSteps();
  const result = await pool.query('SELECT * FROM releases ORDER BY release_date ASC');
  return result.rows.map(row => formatRelease(row, dbSteps));
};

const createRelease = async (data) => {
  const { name, release_date, additional_info, steps } = data;
  const stepBooleans = steps ? steps.map(s => Boolean(s.completed)) : [];
  const result = await pool.query(
    'INSERT INTO releases (name, release_date, additional_info, completed_steps) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, release_date, additional_info || '', stepBooleans]
  );
  const dbSteps = await stepService.getAllSteps();
  return formatRelease(result.rows[0], dbSteps);
};

const updateRelease = async (id, data) => {
  const { name, release_date, additional_info, steps } = data;
  const stepBooleans = steps.map(s => Boolean(s.completed));
  const result = await pool.query(
    'UPDATE releases SET name = $1, release_date = $2, additional_info = $3, completed_steps = $4 WHERE id = $5 RETURNING *',
    [name, release_date, additional_info, stepBooleans, id]
  );
  if (result.rows.length === 0) return null;
  const dbSteps = await stepService.getAllSteps();
  return formatRelease(result.rows[0], dbSteps);
};

const deleteRelease = async (id) => {
  await pool.query('DELETE FROM releases WHERE id = $1', [id]);
};

module.exports = { getAllReleases, createRelease, updateRelease, deleteRelease };