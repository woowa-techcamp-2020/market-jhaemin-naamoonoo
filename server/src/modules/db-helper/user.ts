import { db } from '../../db'

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
    const { id, password, email, name, phone } = userInfo
    db.insert(userInfo, (err, docs) => {})
    return true
  } catch (error) {
    return false
  }
}

export const findUser = (id: string, password?: string): Promise<UserInfo> => {
  return new Promise((resolve) => {
    // if (password){
    // hash password
    //   }
    db.find({ id }, (err, docs) => {
      resolve(docs)
    })
  })
}
