const express = require('express');
const router = express.Router();
const tripulantType_controller = require('../../controllers/api/tripulantType.controller');

router.get('/', tripulantType_controller.tripulantTypeGetAll);

router.get('/:tripluantTypeId', tripulantType_controller.tripulantTypeGetById);

router.post('/', tripulantType_controller.tripulantTypeCreate);

router.delete('/:tripluantTypeId', tripulantType_controller.tripulantTypeDelete);

module.exports = router;