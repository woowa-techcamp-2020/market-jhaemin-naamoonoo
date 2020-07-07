import DataStore from 'nedb'
import { UserInfo } from './schema/user'
import { UserToken } from './schema/userToken'

function createDataStore<T = {}>(schema: string, autoload = true) {
  const dataStore = new DataStore<T>({ filename: `store/${schema}`, autoload })

  return dataStore
}

const userStore = createDataStore<UserInfo>('user')
const userTokenStore = createDataStore<UserToken>('userToken')

export { userStore, userTokenStore }
