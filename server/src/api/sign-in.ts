import express, { Request, Response } from 'express'

import { ApiResponse } from '@/types'
import { ErrMsg } from '../errors'
import { comparePassword } from '../modules/encryption'
import { createUserToken } from '../modules/database/schema/userToken'
import { findUser } from '../modules/database/schema/user'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

router.post('/api/sign-in', async (req: Request, res: Response) => {
  const signInResult: ApiResponse = {
    err: null,
  }
  const { userId, password } = req.body
  const [err, [foundUser, _]] = await findUser({ userId })
  if (!foundUser) {
    signInResult.err = {}
    signInResult.err.userId = ErrMsg.noneExistedUser
    res.send(signInResult)
    return
  }

  const isCorrectPassword = await comparePassword(
    password ?? '',
    foundUser.password
  )

  if (!isCorrectPassword) {
    signInResult.err = {}
    signInResult.err.password = ErrMsg.wrongPassword
    res.send(signInResult)
    return
  }

  req.session.user = foundUser

  const token = uuidv4()
  await createUserToken({ userId, token })
  res.send(signInResult)
})

export { router as signInRouter }
