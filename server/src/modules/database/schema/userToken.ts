import {
  makeCreateFunction,
  makeUpdateFunction,
  makeRemoveFunction,
  makeFindFunction,
} from '../crud'
import { userTokenStore } from '../store'

export type UserToken = {
  userId: string
  token: string
}

export const createUserToken = makeCreateFunction(userTokenStore)
export const findUserToken = makeFindFunction(userTokenStore)
export const updateUserToken = makeUpdateFunction(userTokenStore)
export const deleteUserToken = makeRemoveFunction(userTokenStore)
