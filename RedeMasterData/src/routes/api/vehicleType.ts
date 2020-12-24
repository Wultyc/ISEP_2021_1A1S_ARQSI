import express from 'express'

import VehicleTypeController from '../../controllers/api/VehicleTypeController'
const router = express.Router()

const vehicleType_controller = new VehicleTypeController()

router.get('/', (req,res) => vehicleType_controller.vehicleTypeGetAll(req,res));
router.post('/', (req,res) => vehicleType_controller.vehicleTypeCreate(req,res));

router.get('/:vehicleTypeId', (req,res) => vehicleType_controller.vehicleTypeGetById(req,res));
router.delete('/:vehicleTypeId', (req,res) => vehicleType_controller.vehicleTypeDelete(req,res));

export {router as vehicleType_router}