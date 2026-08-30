const stepService = require('../services/steps.service');

const getSteps = async (req, res) => {
  try {
    const steps = await stepService.getAllSteps();
    res.json(steps);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

module.exports = { getSteps };