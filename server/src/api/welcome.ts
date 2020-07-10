import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/welcome', async (req: Request, res: Response) => {
  if (!req.session.user) {
    res.redirect('/sign-in')
    return
  }

  res.render('welcome/welcome.pug', {
    currentUser: req.session.user,
  })
})

export { router as welcomeRouter }
