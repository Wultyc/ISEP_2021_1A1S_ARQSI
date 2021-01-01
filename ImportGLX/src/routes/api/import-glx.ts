import express from 'express'
const router = express.Router()

import {ImportGLX} from '../../controllers/api/ImportGLX'

const importGlxController = new ImportGLX();

router.post('/', async (req, res, next) => importGlxController.importfile(req,res,next))
//router.post('/dev', async (req, res) =>{ ImportGLX.start()})

export {router as importGlx}