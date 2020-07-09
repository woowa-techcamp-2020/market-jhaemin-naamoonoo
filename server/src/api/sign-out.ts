import express, { Request, Response } from 'express'
import '../middlewares/current-user'
import { deleteUserToken } from '@/modules/database/schema/userToken'

const router = express.Router()

router.get('/api/sign-out', async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err)
    }
    console.log('logged out')
  })
  res.send({})
})

export { router as signOutRouter }
