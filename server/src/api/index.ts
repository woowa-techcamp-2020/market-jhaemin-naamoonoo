import { currentUserRouter } from './current-user'
import express from 'express'
import { isUniqueUserIdRouter } from './validate-user-id'
import { signInRouter } from './sign-in'
import { signOutRouter } from './sign-out'
import { signUpRouter } from './sign-up'

const router = express.Router()

router.use(signUpRouter)
router.use(signInRouter)
router.use(currentUserRouter)
router.use(signOutRouter)
router.use(isUniqueUserIdRouter)

export { router as api }
