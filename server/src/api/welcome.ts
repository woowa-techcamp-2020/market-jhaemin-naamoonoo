import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/welcome', async (req: Request, res: Response) => {
  console.log(req.session)
  res.render('current-user/current-user.pug', {
    currentUser: req.session.user,
  })
})

export { router as welcomeRouter }
