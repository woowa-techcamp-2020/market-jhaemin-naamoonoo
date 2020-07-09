import { ErrMsg } from '../../../server/src/errors'
import Validators from '../../../server/src/modules/validators'
import { setInputWrapper } from '../modules/set-input-wrapper'

const idInputWrapper = setInputWrapper({
  fieldName: 'id',
  validator: async (value) => {
    const isValid = Validators.userId.validator(value)

    if (!isValid) {
      return [false, Validators.userId.error]
    }

    try {
      const response = await fetch('/api/is-unique-user-id', {
        method: 'post',
        body: JSON.stringify(value),
      })
      const result = await response.json()

      return [result, ErrMsg.duplicatedUserId]
    } catch (err) {
      console.error(err)
      return [false, '네트워크 에러']
    }
  },
})

const pwConfirmInputWrapper = setInputWrapper({
  fieldName: 'pw-confirm',
  validator: (value) => [
    value === pwInputWrapper.getValue(),
    '입력한 비밀번호와 다릅니다.',
  ],
})

const pwInputWrapper = setInputWrapper({
  fieldName: 'pw',
  validator: (value) => [
    Validators.password.validator(value),
    Validators.password.error,
  ],
  onDebounce: ({ checkValidation }) => {
    const isValid = checkValidation()

    pwConfirmInputWrapper.display(isValid)
  },
})

const emailInputWrapper = setInputWrapper({
  fieldName: 'email',
  validator: (value) => [
    Validators.email.validator(value),
    Validators.email.error,
  ],
})

const phoneInputConfirmWrapper = setInputWrapper({
  fieldName: 'code',
})

const phoneInputWrapper = setInputWrapper({
  fieldName: 'phone',
  validator: (value) => [
    Validators.phone.validator(value),
    Validators.phone.error,
  ],
  onDebounce: ({ value, checkValidation, replaceActionLabel }) => {
    replaceActionLabel('인증받기')

    const shouldDisplayConfirmElm =
      checkValidation() && value.trim().length !== 0

    phoneInputConfirmWrapper.display(shouldDisplayConfirmElm)
  },
})

phoneInputWrapper.action.addEventListener('click', () => {
  if (phoneInputWrapper.checkValidation()) {
    phoneInputWrapper.replaceActionLabel('재전송')
    alert('1234')
  }
})
