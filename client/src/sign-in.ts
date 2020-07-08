import { fetchWrapper } from './main'

// const res = fetchWrapper('POST', '/sign-up', {
//   userId: 'test4444',
//   password: 'test4444',
//   name: '응복이',
//   phone: '010-3333-3333',
//   email: 'kanwkfe@naewffn.com',
// })
const inputs = Array.from(document.querySelectorAll('.input-field'))
const signInButton = document.querySelector('.sign-in-btn')

const onSubmitHandler = (e) => {
  console.log(e)
  console.log(inputs)

  const userIdInput = inputs.find((input) => input.querySelector('.user-id'))
  const passwordInput = inputs.find((input) => input.querySelector('.password'))
  const body = {
    userId: userIdInput.textContent,
    password: passwordInput.textContent,
  }
  console.log(body)
}
// const res = fetchWrapper('POST', '/sign-in', {
//   userId: 'test4444',
//   password: 'test4444',
// })

signInButton.addEventListener('submit', (e) => {
  e.preventDefault()
  alert('submitted')

  console.log(e.target)
  onSubmitHandler(e)
})
