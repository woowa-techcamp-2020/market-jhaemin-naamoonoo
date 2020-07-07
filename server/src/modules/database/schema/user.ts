import { makeCreateFunction, makeFindFunction } from '../crud'

import { userStore } from '../store'

export type UserInfo = {
  id: string
  password: string
  email: string
  name: string
  phone: string
  address?: Address
}

export type Address = {
  postalCode: number
  essentialAddress: string
  additionalAddress?: string
}

export const createUser = makeCreateFunction(userStore)
export const findUser = makeFindFunction(userStore)
