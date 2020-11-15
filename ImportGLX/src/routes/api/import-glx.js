const express = require('express')
const router = express.Router()

const import_glx_controller = require('../../controllers/api/import-glx.controller');
const import_rede_controller = require('../../controllers/api/upload-rede.controller');

router.post('/', import_glx_controller.importfile)
router.post('/dev', async (req, res) =>{ import_rede_controller.start("20201114_031117.glx.xml"); res.send()})

module.exports = router