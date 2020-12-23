import express from 'express'

import RouteController from '../../controllers/api/RouteController'
const router = express.Router()

const route_controller = new RouteController()

router.get('/', route_controller.routeGetAll);
router.post('/', route_controller.routeCreate);

router.get('/:routeId', route_controller.routeGetById);
router.delete('/:routeId', route_controller.routeDelete);

export {router as routes_router}