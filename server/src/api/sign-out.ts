import express, { Request, Response } from 'express'
import '../middlewares/current-user'
import { deleteUserToken } from '@/modules/database/schema/userToken'

const router = express.Router()

router.get('/api/sign-out', async (req: Request, res: Response) => {
  const token = req.query.token as string
  await deleteUserToken({ token })
  res.send({})
})

export { router as signOutRouter }
