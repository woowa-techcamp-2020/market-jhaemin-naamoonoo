import { ErrMsg } from '../../../server/src/errors'
import Validators from '../../../server/src/modules/validators'
import { setInputWrapper } from '../modules/set-input-wrapper'

let code = '0'
let letfTime = 0

const timer = document.querySelector('.timer') as HTMLElement

const idInputWrapper = setInputWrapper({
  fieldName: 'id',
  validator: async (value) => {
    const isValid = Validators.userId.validator(value)

    if (!isValid) {
      return [isValid, Validators.userId.error]
    }

    try {
      const response = await fetch('/api/is-unique-user-id', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: value,
        }),
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
  validator: (value) => [
    (() => {
      const isSameCode = code === value
      timer.hidden = isSameCode
      return isSameCode
    })(),
    '인증번호가 틀렸습니다.',
  ],
})

const phoneInputWrapper = setInputWrapper({
  fieldName: 'phone',
  validator: (value) => [
    Validators.phone.validator(value),
    Validators.phone.error,
  ],
  onDebounce: (value) => {
    phoneInputConfirmWrapper.display(false)
    phoneInputWrapper.replaceActionLabel('인증받기')
    letfTime = 120
  },
})

const timeTick = () => {
  if (letfTime === 0) {
    timer.hidden = true
    phoneInputConfirmWrapper.display(false)
    phoneInputWrapper.replaceActionLabel('인증받기')
  }

  if (letfTime > 0) {
    letfTime -= 1
  }

  const minute = Math.floor(letfTime / 60).toString()
  const second = letfTime % 60
  timer.innerHTML = `${minute}:${second < 10 ? '0' : ''}${second}`
}

phoneInputWrapper.action.addEventListener('click', () => {
  if (phoneInputWrapper.checkValidation()) {
    phoneInputConfirmWrapper.display(true)
    phoneInputWrapper.replaceActionLabel('재전송')
    letfTime = 120
    timer.hidden = false
    code = '3691'
    setTimeout(
      () => alert(`[배민광장] 사장님의 인증번호는 ${code}입니다`),
      3000
    )
  }
})

export const inputWrappers = {
  userId: idInputWrapper,
  password: pwInputWrapper,
  passwordConfirm: pwConfirmInputWrapper,
  email: emailInputWrapper,
  name: nameInputWrapper,
  phone: phoneInputWrapper,
  phoneConfirm: phoneInputConfirmWrapper,
}

const checkEssentialPart = (): boolean | typeof idInputWrapper => {
  for (const key of Object.keys(inputWrappers)) {
    const wrapper = inputWrappers[key]

    if (!wrapper.checkValidation()) {
      return wrapper
    }
  }

  return true
}

export { checkEssentialPart }

setInterval(() => {
  timeTick()
}, 1000)
