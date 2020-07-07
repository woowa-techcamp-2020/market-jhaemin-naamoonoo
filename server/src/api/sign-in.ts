import express, { Request, Response } from 'express'
import { findUser } from '../modules/database/schema/user'
import { comparePassword } from '../modules/encryption'
import { validateBody } from '../middlewares/validate-body'
import { createUserToken } from '@/modules/database/schema/userToken'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

router.post(
  '/api/sign-in',
  validateBody(['userId', 'password']),
  async (req: Request, res: Response) => {
    const { userId, password } = req.body
    const [err, [foundUser, _]] = await findUser({ userId })
    if (!foundUser) {
      res.status(400).send({
        res: false,
        err,
      })
      return
    }

    const isCorrectPassword = comparePassword(foundUser.password, password)
    if (!isCorrectPassword) {
      res.status(400).send({
        res: false,
        err: 'Invalid password',
      })
      return
    }

    const token = uuidv4()
    await createUserToken({ userId, token })

    res.send({
      res: true,
      token,
    })
  }
)

export { router as signInRouter }
