import { validateUserId } from './validate-user-id'
import { validatePassword } from './validate-password'
import { validateName } from './validate-name'
import { validatePhone } from './validate-phone'
import { validateEmail } from './validate-email'
import { UserInfo } from '../database/schema/user'
import { ErrMsg } from '../../errors'

type ValidatorField = {
  validator: (input: string) => boolean
  error: string
}

type Validator = {
  [k in keyof UserInfo]?: ValidatorField
}

export default {
  userId: { validator: validateUserId, error: ErrMsg.invalidUserId },
  password: { validator: validatePassword, error: ErrMsg.invalidPassword },
  name: { validator: validateName, error: ErrMsg.invalidName },
  phone: { validator: validatePhone, error: ErrMsg.invalidPhone },
  email: {
    validator: validateEmail,
    error: ErrMsg.invalidEmail,
  },
} as Validator
