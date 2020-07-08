import express, { Request, Response } from 'express'
import { findUser } from '../modules/database/schema/user'
import { comparePassword } from '../modules/encryption'
import { validateBody } from '../middlewares/validate-body'
import { createUserToken } from '../modules/database/schema/userToken'
import { v4 as uuidv4 } from 'uuid'
import { ErrMsg } from '../errors'

const router = express.Router()

router.get('/sign-in', (req: Request, res: Response) => {
  res.render('sign-in/sign-in.pug')
})

router.post(
  '/api/sign-in',
  validateBody(['userId', 'password']),
  async (req: Request, res: Response) => {
    const { userId, password } = req.body
    const [err, [foundUser, _]] = await findUser({ userId })
    if (!foundUser) {
      res.status(400).send({
        res: false,
        err: ErrMsg.noneExistedUser,
      })
      return
    }

    const isCorrectPassword = comparePassword(foundUser.password, password)
    if (!isCorrectPassword) {
      res.status(400).send({
        res: false,
        err: ErrMsg.wrongPassword,
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
