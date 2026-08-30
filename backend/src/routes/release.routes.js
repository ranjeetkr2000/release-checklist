const express = require('express');
const router = express.Router();
const releaseController = require('../controllers/release.controller');

router.get('/', releaseController.getReleases);
router.post('/', releaseController.createRelease);
router.put('/:id', releaseController.updateRelease);
router.delete('/:id', releaseController.deleteRelease);

module.exports = router;