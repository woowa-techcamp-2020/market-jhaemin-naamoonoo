import { app, PORT } from './app'
import { db } from './db'

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
