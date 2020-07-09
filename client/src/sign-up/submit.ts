import { checkEssentialPart, inputWrappers } from './essential-part'
import { getAddress, isOptionalChecked } from './optional-part'

import { UserInfo } from '@@/../server/src/modules/database/schema/user'
import { fetchWrapper } from '@/main'
import { isEssentialAgreed } from './policy'

const signUpButton = document.querySelector('.register-btn')
signUpButton.addEventListener('click', async () => {
  // Check client side first
  const result = checkEssentialPart()

  if (typeof result !== 'boolean') {
    result.focus()
    return
  }

  // Check policy agreement
  if (!isEssentialAgreed()) {
    alert('필수 약관에 동의해야합니다.')
    return
  }

  const body = {} as UserInfo

  Object.keys(inputWrappers)
    .filter((key) => !key.includes('Confirm'))
    .forEach((key: keyof typeof inputWrappers) => {
      body[key] = inputWrappers[key].getValue()
    })

  // Optional address
  if (isOptionalChecked()) {
    body.address = getAddress()
  }

  const response = await fetchWrapper('POST', '/sign-up', body)

  if (response.err === null) {
    alert('가입되었습니다.')
    window.location.href = '/welcome'
  }
})
