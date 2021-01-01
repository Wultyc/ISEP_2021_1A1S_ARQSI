import express from 'express'

import LineController from '../../controllers/api/LineController'
const router = express.Router()

const line_controller = new LineController()

router.get('/', (req,res) => line_controller.lineGetAll(req,res));
router.post('/', (req,res) => line_controller.lineCreate(req,res));

router.get('/:lineId', (req,res) => line_controller.lineGetById(req,res));
router.patch('/:lineId', (req,res) => line_controller.linePatch(req,res));
router.delete('/:lineId', (req,res) => line_controller.lineDelete(req,res));

export {router as lines_router}