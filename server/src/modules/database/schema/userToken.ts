import {
  makeCreateFunction,
  makeUpdateFunction,
  makeRemoveFunction,
} from '../crud'
import { userTokenStore } from '../store'

export type UserToken = {
  userId: string
  token: string
}

export const createUserToken = makeCreateFunction(userTokenStore)
export const findUserToken = makeCreateFunction(userTokenStore)
export const updateUserToken = makeUpdateFunction(userTokenStore)
export const deleteUserToken = makeRemoveFunction(userTokenStore)
