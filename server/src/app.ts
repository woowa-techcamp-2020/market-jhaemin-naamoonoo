import { api } from './api'
import bodyParser from 'body-parser'
import express from 'express'
import cookieSession from 'cookie-session'

const app = express()
const PORT = 3000

app.use(bodyParser.json({ limit: '100mb' })) // why?
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true })) // why?

app.use(
  cookieSession({
    name: 'session',
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
)
app.use(api)

app.get('/', (req, res) => res.send('Hello World'))

export { app, PORT }
