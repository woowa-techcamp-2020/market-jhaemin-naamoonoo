import {
  makeCreateFunction,
  makeFindFunction,
  makeRemoveFunction,
  makeUpdateFunction,
} from '../crud'

import { userStore } from '../store'

export type UserInfo = {
  userId: string
  password: string
  email: string
  name: string
  phone: string
  address?: Address
}

export type Address = {
  postalCode?: number
  essentialAddress?: string
  additionalAddress?: string
}

export const createUser = makeCreateFunction(userStore)
export const findUser = makeFindFunction(userStore)
export const updateUser = makeUpdateFunction(userStore)
export const deleteUser = makeRemoveFunction(userStore)

export const isUniqueUserId = async (userId: string) => {
  const [, results] = await findUser({ userId })
  return results.length === 0
}
