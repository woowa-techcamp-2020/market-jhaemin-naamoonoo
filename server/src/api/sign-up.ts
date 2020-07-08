import {
  UserInfo,
  createUser,
  isUniqueUserId,
} from '@/modules/database/schema/user'

import { encryptPassword } from '@/modules/encryption'
import express from 'express'
import { validateBody } from '../middlewares/validate-body'

const router = express.Router()

type FieldResponse = {
  res: boolean
  err: string | null
}

export type SignUpResponse = {
  [K in keyof UserInfo]?: FieldResponse
}

router.post(
  '/sign-up',
  validateBody(['userId', 'password', 'email', 'name', 'phone']),
  async (req, res) => {
    const { userId, password, email, name, phone } = req.body as UserInfo

    const signUpResponse: SignUpResponse = {}

    if (!(await isUniqueUserId(userId))) {
      signUpResponse.userId = {
        res: false,
        err: 'Duplicate ID',
      }
    }

    await createUser({
      userId,
      password: await encryptPassword(password),
      email,
      name,
      phone,
    })

    res.json(signUpResponse)
  }
)

export { router as signUpRouter }
