import { ErrMsg } from '../../../server/src/errors'
import Validators from '../../../server/src/modules/validators'
import { setInputWrapper } from '../modules/set-input-wrapper'

let code = '0'

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
  onDebounce: () => {
    const isValid = pwInputWrapper.checkValidation()

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

const nameInputWrapper = setInputWrapper({
  fieldName: 'name',
  validator: (value) => [
    Validators.name.validator(value),
    Validators.name.error,
  ],
})

const phoneInputConfirmWrapper = setInputWrapper({
  fieldName: 'code',
  validator: (value) => [code === value, '인증번호가 틀렸습니다.'],
})

const phoneInputWrapper = setInputWrapper({
  fieldName: 'phone',
  validator: (value) => [
    Validators.phone.validator(value),
    Validators.phone.error,
  ],
  onDebounce: (value) => {
    const { replaceActionLabel, checkValidation } = phoneInputWrapper

    replaceActionLabel('인증받기')

    const shouldDisplayConfirmElm =
      checkValidation() && value.trim().length !== 0

    phoneInputConfirmWrapper.display(shouldDisplayConfirmElm)
  },
})

phoneInputWrapper.action.addEventListener('click', () => {
  if (phoneInputWrapper.checkValidation()) {
    phoneInputWrapper.replaceActionLabel('재전송')
    code = '3691'
    alert(code)
  }
})

const inputWrappers = [
  idInputWrapper,
  pwInputWrapper,
  pwConfirmInputWrapper,
  emailInputWrapper,
  nameInputWrapper,
  phoneInputWrapper,
  phoneInputConfirmWrapper,
]

const isAllValid = () => {
  for (const wrapper of inputWrappers) {
    if (!wrapper.checkValidation()) {
      return false
    }
  }

  return true
}

setInterval(() => {
  console.log(isAllValid())
}, 1000)
