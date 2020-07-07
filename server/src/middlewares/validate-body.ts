import { Response, Request, NextFunction } from 'express'
import { UserInfo, deleteUser } from '../modules/database/schema/user'
import Validator from '../modules/validators'

export const validateBody = (attrs: (keyof UserInfo)[]) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validatedResult = attrs.reduce((results, key) => {
    const { validator, error: err } = Validator[key]
    const isValidInput = validator(req.body[key])
    if (!isValidInput) {
      results[key] = {
        res: isValidInput,
        err: !isValidInput ? err : null,
      }
    }
    return results
  }, {})

  const numberOfInvalidInput = Object.keys(validatedResult).length
  if (numberOfInvalidInput !== 0) {
    return res.status(400).send(validatedResult)
  }

  next()
}
