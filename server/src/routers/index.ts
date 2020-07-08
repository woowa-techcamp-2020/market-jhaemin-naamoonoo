import express from 'express'
import { homeRouter } from './home'

const router = express.Router()

router.use(homeRouter)

export { router as routers }
