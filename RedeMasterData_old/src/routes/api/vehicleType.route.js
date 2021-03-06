const express = require('express');
const router = express.Router();
const vehicleType_controller = require('../../controllers/api/vehicleType.controller');

router.get('/', vehicleType_controller.vehicleTypeGetAll);

router.get('/:vehicleTypeId', vehicleType_controller.vehicleTypeGetById);

router.post('/', vehicleType_controller.vehicleTypeCreate);

router.delete('/:vehicleTypeId', vehicleType_controller.vehicleTypeDelete);

module.exports = router;