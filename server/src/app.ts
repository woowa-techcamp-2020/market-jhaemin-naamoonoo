import { api } from './api'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import express from 'express'
import path from 'path'
import { routers } from './routers'

const app = express()
const PORT = 3000

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

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

// Serve static files at `public` directory
app.use(express.static(path.join(__dirname, '/public')))

// Change the default views directory
app.set('views', path.join(__dirname, '/views'))

// Use pug engine
app.set('view engine', 'pug')

// Serve
app.use(routers)

export { app, PORT }
