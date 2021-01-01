import express from 'express'

import TripulantTypeController from '../../controllers/api/TripulantTypeController'
const router = express.Router()

const tripulantType_controller = new TripulantTypeController()

router.get('/', (req,res) => tripulantType_controller.tripulantTypeGetAll(req,res));
router.post('/', (req,res) => tripulantType_controller.tripulantTypeCreate(req,res));

router.get('/:tripulantTypeId', (req,res) => tripulantType_controller.tripulantTypeGetById(req,res));
router.delete('/:tripulantTypeId', (req,res) => tripulantType_controller.tripulantTypeDelete(req,res));

export {router as tripulantType_router}