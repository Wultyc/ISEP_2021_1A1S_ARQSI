const express = require('express');
const router = express.Router();

const line_controller = require('../controllers/api/line.controller');

router.post('/create', line_controller.lineCreate);

module.exports = router;