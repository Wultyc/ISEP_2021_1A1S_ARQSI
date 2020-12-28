import express from 'express'

import NodeController from '../../controllers/api/NodeController'
const router = express.Router()

const node_controller = new NodeController()

router.get('/', (req,res) => node_controller.nodeGetAll(req,res));
router.post('/', (req,res) => node_controller.nodeCreate(req,res));

router.get('/:nodeId', (req,res) => node_controller.nodeGetById(req,res));
router.delete('/:nodeId', (req,res) => node_controller.nodeDelete(req,res));

export {router as nodes_router}