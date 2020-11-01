const express = require('express');
const router = express.Router();
const vehicleType_controller = require('../../controllers/api/vehicleType.controller');

router.post('/', vehicleType_controller.vehicleTypeCreate);

module.exports = router;