import { fetchWrapper } from './main'
import Validator from '../../server/src/modules/validators'

const signInButton = document.querySelector('.sign-in-btn')

const onSubmitHandler = async (e: Event) => {
  e.preventDefault()
  const userIdWrapper = document.querySelector('.input-wrapper.id')
  const passwordWrapper = document.querySelector('.input-wrapper.pw')

  const userIdInput = userIdWrapper.querySelector('input') as HTMLInputElement
  const passwordInput = passwordWrapper.querySelector(
    'input'
  ) as HTMLInputElement
  const body = {
    userId: userIdInput.value,
    password: passwordInput.value,
  }

  const res = await fetchWrapper('POST', '/sign-in', body)
  if (res.err.userId) {
    userIdWrapper.classList.remove('valid-input')
    userIdWrapper.classList.add('invalid-input')
    userIdWrapper.querySelector('.msg-text').innerHTML = res.err.userId
  }

  if (res.err.password) {
    passwordWrapper.classList.remove('valid-input')
    passwordWrapper.classList.add('invalid-input')
    passwordWrapper.querySelector('.msg-text').innerHTML = res.err.password
  }
}

signInButton.addEventListener('click', onSubmitHandler)

const userIdInput = document.querySelector(
  '.input-wrapper.id input'
) as HTMLInputElement

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

userIdInput.addEventListener('blur', validationOnBlur)

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

userIdInput.addEventListener('input', validationOnChange)
const inputs = Array.from(document.querySelectorAll('.input-text'))
inputs.forEach((input) => {
  input.addEventListener('blur', validationOnBlur)
  input.addEventListener('input', validationOnChange)
})
