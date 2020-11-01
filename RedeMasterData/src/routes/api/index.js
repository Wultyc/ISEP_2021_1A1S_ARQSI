const express = require('express')
const router = express.Router()
const line = require('./line.route')
const node = require('./node.route')
const tripulantTye = require('./tripulantType.route')

router.use('/lines', line)
router.use('/nodes', node)
router.use('/tipulant-types', tripulantTye)

module.exports = router