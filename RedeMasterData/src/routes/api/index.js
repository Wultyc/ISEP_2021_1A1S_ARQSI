const express = require('express')
const router = express.Router()
const line = require('./line.route')
const node = require('./node.route')
const tripulantType = require('./tripulantType.route')
const vehicleType = require('./tripulantType.route')

router.use('/lines', line)
router.use('/nodes', node)
router.use('/tipulant-types', tripulantType)
router.use('/vehicle-types', vehicleType)

module.exports = router