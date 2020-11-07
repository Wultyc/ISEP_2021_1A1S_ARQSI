const express = require('express');
const router = express.Router();
const tripluantType_controller = require('../../controllers/api/tripulantType.controller');

router.get('/', tripluantType_controller.tripulantTypeGetAll);

router.get('/:tripluantTypeId', tripluantType_controller.tripulantTypeGetById);

router.post('/create', tripluantType_controller.tripulantTypeCreate);

router.delete('/:tripluantTypeId/delete', tripluantType_controller.tripulantTypeDelete);

module.exports = router;