const express = require('express');
const router = express.Router();
const tripluantType_controller = require('../../controllers/api/tripulantType.controller');

router.post('/', tripluantType_controller.tripulantTypeCreate);

module.exports = router;