import express, { Request, Response } from 'express'

import { currentUser } from '../middlewares/current-user'

const router = express.Router()

router.get('/welcome', currentUser, async (req: Request, res: Response) => {
  res.render('current-user/current-user.pug', {
    currentUser: {
      name: '우아한',
      userId: 'woowa11',
      email: 'woowa11@woowa.com',
      phone: '010-6555-5555',
    },
    // currentUser: req.currentUser || null,
  })
})

export { router as currentUserRouter }
