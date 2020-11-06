const express = require('express');
const router = express.Router();

const route_controller = require('../../controllers/api/route.controller');

router.post('/', route_controller.routeCreate);

module.exports = router;