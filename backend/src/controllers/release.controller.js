const releaseService = require('../services/release.service');

const getReleases = async (req, res) => {
  try {
    const releases = await releaseService.getAllReleases();
    res.json(releases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createRelease = async (req, res) => {
  try {
    const newRelease = await releaseService.createRelease(req.body);
    res.status(201).json(newRelease);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateRelease = async (req, res) => {
  try {
    const updatedRelease = await releaseService.updateRelease(req.params.id, req.body);
    if (!updatedRelease) return res.status(404).json({ error: 'Release not found' });
    res.json(updatedRelease);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteRelease = async (req, res) => {
  try {
    await releaseService.deleteRelease(req.params.id);
    res.status(204).send(); // Returns 204 No Content on successful deletion
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
};

module.exports = {
  getReleases,
  createRelease,
  updateRelease,
  deleteRelease
};