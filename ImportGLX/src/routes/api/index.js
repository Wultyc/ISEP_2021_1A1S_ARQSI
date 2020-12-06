const express = require('express')
const router = express.Router()
const importGlx = require('./import-glx')

router.use('/import-glx', importGlx)
router.get('/healthcheck', (req, res) => {res.send("I'm Alive")})

module.exports = router