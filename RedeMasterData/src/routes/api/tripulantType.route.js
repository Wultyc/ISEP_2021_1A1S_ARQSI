const express = require('express');
const router = express.Router();
const type_controller = require('../../controllers/api/tripulantType.controller');

router.post('/', type_controller.tripulantType_create);

module.exports = router;