import { api } from './api'
import appRoot from 'app-root-path'
import bodyParser from 'body-parser'
import session from 'express-session'
import express from 'express'
import { routers } from './routers'

const app = express()
const PORT = 3000

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

app.set('trust proxy', 1) // trust first proxy
app.use(
  session({
    secret: 'hamingod',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24000 * 60 * 60 },
  })
)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

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
