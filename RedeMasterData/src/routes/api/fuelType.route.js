const express = require('express');
const router = express.Router();
const fuelType_controller = require('../../controllers/api/fuelType.controller');

router.post('/', fuelType_controller.fuelTypeCreate);

module.exports = router;