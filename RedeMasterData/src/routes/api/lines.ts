import express from 'express'

import LineController from '../../controllers/api/LineController'
const router = express.Router()

const line_controller = new LineController()

router.get('/', (req,res) => line_controller.lineGetByFilter(req,res));
router.post('/', (req,res) => line_controller.lineCreate(req,res));

router.get('/:lineId', (req,res) => line_controller.lineGetById(req,res));
router.put('/:lineId', (req,res) => line_controller.lineUpdate(req,res));
router.delete('/:lineId', (req,res) => line_controller.lineDelete(req,res));

router.get('/:lineId/routes', (req,res) => line_controller.lineGetRoutesById(req,res));

export {router as lines_router}