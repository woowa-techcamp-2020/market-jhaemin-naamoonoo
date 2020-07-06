import Datastore from 'nedb'

export const db = new Datastore({ filename: 'database/db', autoload: true })
