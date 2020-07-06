import { db } from '../../db'
import { comparePassword } from '../encryption'

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

export const createUser = (userInfo: UserInfo): boolean => {
  try {
    db.insert(userInfo, (err, docs) => {})
    return true
  } catch (error) {
    return false
  }
}

export const findUser = (id: string, password?: string): Promise<UserInfo> => {
  return new Promise((resolve) => {
    db.find<UserInfo>({ id }, async (err, docs) => {
      if (!password) {
        resolve(docs[0])
        return
      }

      const isPasswordCorrect = await comparePassword(
        password,
        docs[0].password
      )
      if (isPasswordCorrect) {
        resolve(docs[0])
      }
    })
  })
}
