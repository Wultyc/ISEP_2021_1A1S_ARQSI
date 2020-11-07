const express = require('express');
const router = express.Router();

const segment_controller = require('../../controllers/api/segment.controller');

router.get('/', segment_controller.segmentGetAll);

router.get('/:segmentId', segment_controller.segmentGetById);

router.post('/create', segment_controller.segmentCreate);

router.delete('/:segmentId/delete', segment_controller.segmentDelete);

module.exports = router;