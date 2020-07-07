import { validateId } from './validate-id'
import { validatePassword } from './validate-password'
import { validateName } from './validate-name'
import { validatePhone } from './validate-phone'
import { validateEmail } from './validate-email'
import { UserInfo } from '../database/schema/user'

type ValidatorField = {
  validator: (input: string) => boolean
  error: string
}

type Validator = {
  [k in keyof UserInfo]?: ValidatorField
}

export default {
  userId: { validator: validateId, error: 'ID 에러임' },
  password: { validator: validatePassword, error: 'Pasword 에러임' },
  name: { validator: validateName, error: 'name 에러임' },
  phone: { validator: validatePhone, error: 'phone 에러임' },
  email: {
    validator: validateEmail,
    error: '이메일 error',
  },
} as Validator
