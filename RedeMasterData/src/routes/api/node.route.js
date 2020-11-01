const express = require('express');
const router = express.Router();

const node_controller = require('../../controllers/api/node.controller');

router.post('/', node_controller.nodeCreate);

module.exports = router;