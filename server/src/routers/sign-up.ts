import appRoot from 'app-root-path'
import express from 'express'

const router = express.Router()

router.get('/sign-up', (req, res) => {
  if (req.session.user) {
    res.redirect('/welcome')
    return
  }

  res.sendFile(appRoot.resolve('/src/views-html/sign-up.html'))
})

export { router as signUpRouter }
