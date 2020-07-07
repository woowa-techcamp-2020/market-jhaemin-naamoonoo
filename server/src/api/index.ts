import express from 'express'
import { signInRouter } from './sign-in'
import { signUpRouter } from './sign-up'
import { signOutRouter } from './sign-out'
import { currentUserRouter } from './current-user'

const router = express.Router()

router.use(signUpRouter)
router.use(signInRouter)
router.use(currentUserRouter)
router.use(signOutRouter)

export { router as api }
