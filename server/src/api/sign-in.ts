import express, { Request, Response } from 'express'
import { findUser } from '../modules/database/schema/user'
import { comparePassword } from '../modules/encryption'
import { validateBody } from '../middlewares/validate-body'

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

    res.send(200)
  }
)

export { router as signInRouter }
