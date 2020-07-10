import Validator from '../../server/src/modules/validators'
import { onSubmitHandler } from './main'

const signInButton = document.querySelector('.sign-in-btn')

signInButton.addEventListener('click', (e: Event) => submit())

const userIdInputWrapper = document.querySelector(
  '.input-wrapper.id'
) as HTMLDivElement
const userPwInputWrapper = document.querySelector(
  '.input-wrapper.pw'
) as HTMLDivElement

const userIdInput = document.querySelector(
  '.input-wrapper.id input'
) as HTMLInputElement

const userPwInput = document.querySelector(
  '.input-wrapper.pw input'
) as HTMLInputElement

async function submit() {
  const res = await onSubmitHandler(null, '/sign-in')

  if (res && res.userId) {
    userIdInput.focus()
  } else {
    userIdInputWrapper.classList.remove('invalid-input')
    userIdInputWrapper.classList.add('valid-input')
  }

  if (res && res.password) {
    userPwInput.focus()
  }
}

userIdInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    userPwInput.focus()
  }
})

userPwInput.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    await submit()
  }
})

const validationOnBlur = (e: Event) => {
  const inputElement = e.target
  if (!(inputElement instanceof HTMLInputElement)) {
    return
  }

  const wrapper = inputElement.parentElement
  const inputText = inputElement.value
  const inputName = inputElement.name
  const inputNameKr = inputElement.placeholder

  const { validator, error } = Validator[inputName]
  if (!inputText) {
    wrapper.classList.remove('valid-input')
    wrapper.classList.add('invalid-input')
    const errorMsg = wrapper.querySelector('.msg-text')
    errorMsg.textContent = `${inputNameKr} 값이 비어있어요. 입력해주세요.`
    return
  }

  if (validator(inputText)) {
    wrapper.classList.add('valid-input')
    wrapper.classList.remove('invalid-input')
  } else {
    wrapper.classList.remove('valid-input')
    wrapper.classList.add('invalid-input')
    const errorMsg = wrapper.querySelector('.msg-text')
    errorMsg.textContent = error
  }
}

// userIdInput.addEventListener('blur', validationOnBlur)

const validationOnChange = (e: Event) => {
  const inputElement = e.target
  if (!(inputElement instanceof HTMLInputElement)) {
    return
  }

  const wrapper = inputElement.parentElement
  if (!wrapper.classList.contains('invalid-input')) {
    return
  }

  const inputText = inputElement.value
  const inputName = inputElement.name
  const { validator } = Validator[inputName]
  if (validator(inputText)) {
    wrapper.classList.add('valid-input')
    wrapper.classList.remove('invalid-input')
  }
}

// userIdInput.addEventListener('input', validationOnChange)
// const inputs = Array.from(document.querySelectorAll('.input-text'))
// inputs.forEach((input) => {
//   input.addEventListener('blur', validationOnBlur)
//   input.addEventListener('input', validationOnChange)
// })
