import express from 'express'

const router = express.Router()

router.get('/healthcheck', (req, res) => {res.send("I'm Alive")})

export {router as api}