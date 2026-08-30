const express = require('express');
const router = express.Router();
const stepController = require('../controllers/steps.controller');

router.get('/', stepController.getSteps);

module.exports = router;