import express from 'express'
import { homeRouter } from './home'
import { signUpRouter } from './sign-up'
import { signInRouter } from './sign-in'

const router = express.Router()

router.use(homeRouter)
router.use(signUpRouter)
router.use(signInRouter)

export { router as routers }
