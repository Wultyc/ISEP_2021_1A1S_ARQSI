import express from 'express'

import TripulantTypeController from '../../controllers/api/TripulantTypeController'
const router = express.Router()

const tripulantType_controller = new TripulantTypeController()

router.get('/', tripulantType_controller.tripulantTypeGetAll);
router.post('/', tripulantType_controller.tripulantTypeCreate);

router.get('/:tripulantTypeId', tripulantType_controller.tripulantTypeGetById);
router.delete('/:tripulantTypeId', tripulantType_controller.tripulantTypeDelete);

export {router as tripulantType_router}