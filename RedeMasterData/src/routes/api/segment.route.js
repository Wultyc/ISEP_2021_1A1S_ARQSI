const express = require('express');
const router = express.Router();

const segment_controller = require('../../controllers/api/segment.controller');

router.post('/', segment_controller.segmentCreate);

module.exports = router;