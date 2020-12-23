import express from 'express'

import VehicleTypeController from '../../controllers/api/VehicleTypeController'
const router = express.Router()

const vehicleType_controller = new VehicleTypeController()

router.get('/', vehicleType_controller.vehicleTypeGetAll);
router.post('/', vehicleType_controller.vehicleTypeCreate);

router.get('/:vehicleTypeId', vehicleType_controller.vehicleTypeGetById);
router.delete('/:vehicleTypeId', vehicleType_controller.vehicleTypeDelete);

export {router as vehicleType_router}