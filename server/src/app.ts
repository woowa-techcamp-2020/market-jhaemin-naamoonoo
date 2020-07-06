import { api } from './api'
import bodyParser from 'body-parser'
import express from 'express'

const app = express()
const PORT = 3000

app.use(bodyParser.json({ limit: '100mb' }))
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))

app.use(api)

app.get('/', (req, res) => res.send('Hello World'))

export { app, PORT }
