import { validateId } from './validate-id'
import { validatePassword } from './validate-password'
import { validateName } from './validate-name'
import { validatePhone } from './validate-phone'
import { validateEmail } from './validate-email'

export default {
  id: validateId,
  password: validatePassword,
  name: validateName,
  phone: validatePhone,
  validateEmail: validateEmail,
}
