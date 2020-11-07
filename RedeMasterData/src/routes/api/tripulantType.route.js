const express = require('express');
const router = express.Router();
const tripluantType_controller = require('../../controllers/api/tripulantType.controller');

router.get('/', tripluantType_controller.tripluantTypeGetAll);

router.get('/:tripluantTypeId', tripluantType_controller.tripluantTypeGetById);

router.post('/create', tripluantType_controller.tripulantTypeCreate);

router.delete('/:tripluantTypeId/delete', tripluantType_controller.tripluantTypeDelete);

module.exports = router;