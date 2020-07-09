import { api } from './api'
import appRoot from 'app-root-path'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import express from 'express'
import { routers } from './routers'

const app = express()
const PORT = 3000

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

app.use(bodyParser.json()) // why?
app.use(bodyParser.urlencoded({ extended: true })) // why?

app.use(
  cookieSession({
    name: 'session',
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
)

app.use(api)

// Serve static files at `public` directory
app.use(express.static(appRoot.resolve('/src/public')))

// Change the default views directory
app.set('views', appRoot.resolve('/src/views'))

// Use pug engine
app.set('view engine', 'pug')

// Serve
app.use(routers)

export { app, PORT }
