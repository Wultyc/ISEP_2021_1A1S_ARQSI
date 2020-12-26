import express from 'express'

import {lines_router} from './lines'
import {nodes_router} from './nodes'
import {routes_router} from './routes'
import {tripulantType_router} from './tripulantType'
import {vehicleType_router} from './vehicleType'

const router = express.Router()

router.use('/lines',lines_router)
router.use('/nodes',nodes_router)
router.use('/routes',routes_router)
router.use('/tripulant-types',tripulantType_router)
router.use('/vehicle-types',vehicleType_router)

router.get('/healthcheck', (req, res) => {res.send("I'm Alive")})

export {router as api}