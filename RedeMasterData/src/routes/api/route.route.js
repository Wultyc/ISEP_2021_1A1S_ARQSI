const express = require('express');
const router = express.Router();

const route_controller = require('../../controllers/api/route.controller');

router.get('/', route_controller.routeGetAll);

router.get('/:routeId', route_controller.routeGetById);

router.post('/create', route_controller.routeCreate);

router.delete('/:routeId/delete', route_controller.routeDelete);

module.exports = router;