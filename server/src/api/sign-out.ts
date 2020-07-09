import '../middlewares/current-user'

import express, { Request, Response } from 'express'

import { deleteUserToken } from '@/modules/database/schema/userToken'

const router = express.Router()

router.get('/sign-out', async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err)
    }
  })
  res.redirect('/')
})

export { router as signOutRouter }
