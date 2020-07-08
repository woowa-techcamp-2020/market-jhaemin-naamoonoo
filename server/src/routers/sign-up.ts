import appRoot from 'app-root-path'
import express from 'express'

const router = express.Router()

router.get('/sign-up', (req, res) =>
  res.sendFile(appRoot.resolve('/src/views-html/sign-up.html'))
)

export { router as signUpRouter }
