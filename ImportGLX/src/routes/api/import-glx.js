const express = require('express')
const router = express.Router()

const import_glx_controller = require('../../controllers/api/import-glx.controller');

router.post('/', import_glx_controller.importfile)

module.exports = router