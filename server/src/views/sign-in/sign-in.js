const idInput = document.querySelector('#id-input')
idInput.addEventListener('focus', () => console.log('hello'))
idInput.addEventListener('blur', () => console.log('bye'))

const passwordInput = document.querySelector('#password-input')
passwordInput.addEventListener('blur', () => {
  console.log('byebyh')
})
