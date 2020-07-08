import express from 'express'
import { homeRouter } from './home'
import { signUpRouter } from './sign-up'

const router = express.Router()

router.use(homeRouter)
router.use(signUpRouter)

export { router as routers }
