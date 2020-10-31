const express = require('express');
const router = express.Router();

const node_controller = require('../controllers/api/node.controller');

router.post('/create', node_controller.node_create);

module.exports = router;