import express from 'express'
import { signInRouter } from './sign-in'
import { signUpRouter } from './sign-up'

const router = express.Router()

router.use(signUpRouter)
router.use(signInRouter)

export { router as api }
