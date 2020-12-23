import express from 'express'

import LineController from '../../controllers/api/LineController'
const router = express.Router()

const line_controller = new LineController()

router.get('/', line_controller.lineGetByFilter);
router.post('/', line_controller.lineCreate);

router.get('/:lineId', line_controller.lineGetById);
router.put('/:lineId', line_controller.lineUpdate);
router.delete('/:lineId', line_controller.lineDelete);

router.get('/:lineId/routes', line_controller.lineGetRoutesById);

export {router as lines_router}