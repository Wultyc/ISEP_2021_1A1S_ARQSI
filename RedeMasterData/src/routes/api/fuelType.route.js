const express = require('express');
const router = express.Router();
const fuelType_controller = require('../../controllers/api/fuelType.controller');

router.get('/', fuelType_controller.fuelTypeGetAll);

router.get('/:fuelTypeId', fuelType_controller.fuelTypeGetById);

router.post('/create', fuelType_controller.fuelTypeCreate);

router.delete('/:fuelTypeId/delete', fuelType_controller.fuelTypeDelete);

module.exports = router;