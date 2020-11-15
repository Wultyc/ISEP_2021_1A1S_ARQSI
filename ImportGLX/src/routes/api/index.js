const express = require('express')
const router = express.Router()
const importGlx = require('./import-glx')

router.use('/import-glx', importGlx)

module.exports = router