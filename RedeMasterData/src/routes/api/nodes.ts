import express from 'express'

import NodeController from '../../controllers/api/NodeController'
const router = express.Router()

const node_controller = new NodeController()

router.get('/', node_controller.nodeGetAll);
router.post('/', node_controller.nodeCreate);

router.get('/:nodeId', node_controller.nodeGetById);
router.delete('/:nodeId', node_controller.nodeDelete);

export {router as nodes_router}