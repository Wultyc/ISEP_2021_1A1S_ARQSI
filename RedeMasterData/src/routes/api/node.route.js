const express = require('express');
const router = express.Router();

const node_controller = require('../../controllers/api/node.controller');

router.get('/', node_controller.nodeGetAll);

router.get('/:nodeId', node_controller.nodeGetById);

router.post('/create', node_controller.nodeCreate);

router.delete('/:nodeId/delete', node_controller.nodeDelete);

module.exports = router;