import express from 'express'
import {importGlx} from './import-glx'

const router = express.Router()

router.use('/import-glx', importGlx)
router.get('/healthcheck', (req, res) => {res.send("I'm Alive")})

export {router as api}