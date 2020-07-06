import express from 'express'

import Datastore from 'nedb'

const db = new Datastore({ filename: 'database/db', autoload: true })
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World'))

app.listen(port, () => console.log(`Listening on port ${port}`))
