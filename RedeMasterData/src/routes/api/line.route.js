const express = require('express');
const router = express.Router();

const line_controller = require('../../controllers/api/line.controller');

router.get('/', line_controller.lineGetByFilter);

router.get('/:lineId', line_controller.lineGetById);

router.post('/create', line_controller.lineCreate);

router.delete('/:lineId/delete', line_controller.lineDelete);

module.exports = router;