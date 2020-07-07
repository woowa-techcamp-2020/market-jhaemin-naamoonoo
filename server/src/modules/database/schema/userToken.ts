import { makeCreateFunction } from '../crud'
import { userTokenStore } from '../store'

export type UserToken = {
  id: string
  token: string
}

export const createUserToken = makeCreateFunction(userTokenStore)
export const findUserToken = makeCreateFunction(userTokenStore)
