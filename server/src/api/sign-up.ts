import {
  UserInfo,
  createUser,
  isUniqueUserId,
} from '@/modules/database/schema/user'

import { ApiResponse } from '../types'
import { ErrMsg } from '@/errors'
import { encryptPassword } from '@/modules/encryption'
import express from 'express'
import { validateBody } from '../middlewares/validate-body'

const router = express.Router()

router.post(
  '/api/sign-up',
  validateBody(['userId', 'password', 'email', 'name', 'phone']),
  async (req, res) => {
    const {
      userId,
      password,
      email,
      name,
      phone,
      address,
    } = req.body as UserInfo

    const signUpResponse: ApiResponse = { err: null }

    if (!(await isUniqueUserId(userId))) {
      signUpResponse.err = {}
      signUpResponse.err.userId = ErrMsg.duplicatedUserId
      return
    }

    const newUser = await createUser({
      userId,
      password: await encryptPassword(password),
      email,
      name,
      phone,
      address,
    })

    req.session.user = newUser

    res.json(signUpResponse)
  }
)

export { router as signUpRouter }
