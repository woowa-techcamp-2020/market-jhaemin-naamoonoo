import express, { Request, Response } from 'express'
import { currentUser } from '../middlewares/current-user'

const router = express.Router()

router.get(
  '/api/current-user',
  currentUser,
  async (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null })
  }
)

export { router as currentUserRouter }
