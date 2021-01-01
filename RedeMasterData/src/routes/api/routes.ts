import express from 'express'

import RouteController from '../../controllers/api/RouteController'
const router = express.Router()

const route_controller = new RouteController()

router.get('/', (req,res) => route_controller.routeGetAll(req,res));
router.post('/', (req,res) => route_controller.routeCreate(req,res));

router.get('/:routeId', (req,res) => route_controller.routeGetById(req,res));
router.delete('/:routeId', (req,res) => route_controller.routeDelete(req,res));

export {router as routes_router}