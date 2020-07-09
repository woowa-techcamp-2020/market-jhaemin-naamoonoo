import { onSubmitHandler } from '../main'
import './essential-part'
import './additional-part'

const signUpButton = document.querySelector('.register-btn')
signUpButton.addEventListener('click', (e: Event) =>
  onSubmitHandler(e, '/sign-up')
)
