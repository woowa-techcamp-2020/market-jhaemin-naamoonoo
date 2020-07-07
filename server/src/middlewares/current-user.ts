import { Response, Request, NextFunction, request } from 'express'
import { findUserToken } from '../modules/database/schema/userToken'
import { findUser, Address } from '../modules/database/schema/user'

interface IUserPayload {
  userId: string
  name: string
  email: string
  phone: string
  address: Address
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: IUserPayload
    }
  }
}

export const currentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.query.token)
  if (!req.query.token) {
    return next()
  }

  try {
    const [tokenErr, [storedToken, _]] = await findUserToken({
      token: req.query.token as string,
    })
    const [userErr, [user, __]] = await findUser({ userId: storedToken.userId })
    req.currentUser = user as IUserPayload
  } catch (err) {}

  next()
}
