const express = require('express')
const router = express.Router()
const line = require('./line.route')
const route = require('./route.route')
const node = require('./node.route')
const tripulantType = require('./tripulantType.route')
const vehicleType = require('./vehicleType.route')

router.use('/lines', line)
router.use('/routes', route)
router.use('/nodes', node)
router.use('/tripulant-types', tripulantType)
router.use('/vehicle-types', vehicleType)

router.get('/healthcheck', (req, res) => {res.send("I'm Alive")})

module.exports = router