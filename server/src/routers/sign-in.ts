import appRoot from 'app-root-path'
import express from 'express'

const router = express.Router()

router.get('/sign-in', (req, res) => {
  if (req.session.user) {
    res.redirect('/welcome')
    return
  }

  res.sendFile(appRoot.resolve('/src/views-html/sign-in.html'))
})

export { router as signInRouter }
