const express = require('express')
const router = express.Router()
const line = require('./line.route')
const route = require('./route.route')
const segment = require('./segment.route')
const node = require('./node.route')
const tripulantType = require('./tripulantType.route')
const vehicleType = require('./vehicleType.route')
const fuelType = require('./fuelType.route')

router.use('/lines', line)
router.use('/routes', route)
router.use('/segments', segment)
router.use('/nodes', node)
router.use('/tripulant-types', tripulantType)
router.use('/vehicle-types', vehicleType)
router.use('/fuel-types', fuelType)

module.exports = router