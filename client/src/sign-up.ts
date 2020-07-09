import Validators from '../../server/src/modules/validators'
import { defaultMaxListeners } from '../../server/node_modules/@types/nedb'
import { onSubmitHandler } from './main'

declare global {
  interface Window {
    daum: any
  }
}

type FieldName =
  | 'id'
  | 'pw'
  | 'pw-confirm'
  | 'email'
  | 'name'
  | 'phone'
  | 'code'

const setInputWrapper = ({
  fieldName,
  validator,
}: {
  fieldName: FieldName
  validator?: (
    value: string
  ) => Promise<[boolean, string?]> | [boolean, string?]
}) => {
  const wrapper = document.querySelector(
    `.input-wrapper.${fieldName}`
  ) as HTMLElement
  const input = wrapper.querySelector('input')

  const setOk = () => {
    wrapper.classList.remove('invalid-input')
    wrapper.classList.add('valid-input')
  }

  const setErrMsg = (msg: string) => {
    wrapper.classList.remove('valid-input')
    wrapper.classList.add('invalid-input')
    wrapper.querySelector('.msg-text').innerHTML = msg
  }

  let debounceTimeout = 0

  if (validator) {
    input.addEventListener('input', () => {
      if (debounceTimeout) {
        window.clearTimeout(debounceTimeout)
      }

      debounceTimeout = window.setTimeout(async () => {
        // const validatorReturn = validator(input.value)
        // const [isValid, errMsg] = validatorReturn instanceof Promise ? await validatorReturn
        // if (isValid) {
        //   setOk()
        //   return
        // }
        // setErrMsg(errMsg)
      }, 300)
    })
  }

  return {
    wrapper,
    input: wrapper.querySelector('input'),
    setErrMsg,
    setOk,
    reset: () => {
      wrapper.classList.remove('invalid-input')
      wrapper.classList.remove('valid-input')
    },
    value: () => input.value,
  }
}

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

      return [result, '이미 사용중인 아이디입니다.']
    } catch (err) {
      console.error(err)
      return [false, '네트워크 에러']
    }
  },
})

const pwInputWrapper = setInputWrapper({
  fieldName: 'pw',
  validator: (value) => [
    Validators.password.validator(value),
    Validators.password.error,
  ],
})

// const pwConfirmInputWrapper = setInputWrapper({
//   fieldName: 'pw-confirm',
//   onDebounced: ({ value, setOk, setErrMsg }) => {
//     if (value !== pwInputWrapper.value()) {
//       setErrMsg('입력한 패스워드가 다릅니다.')
//       return
//     }

//     setOk()
//   },
// })

// const emailInputWrapper = setInputWrapper({
//   fieldName: 'email',
//   onDebounced: ({ value, setOk, setErrMsg }) => {
//     if (!Validators.email.validator(value)) {
//       setErrMsg(Validators.email.error)
//       return
//     }

//     setOk()
//   },
// })

// const phoneInputWrapper = setInputWrapper({
//   fieldName: 'phone',
//   onDebounced: ({ value, setOk, setErrMsg }) => {
//     if (!Validators.phone.validator(value)) {
//       setErrMsg(Validators.phone.error)
//       return
//     }

//     setOk()
//   },
// })

// checkbox handler
const checkBox = document.querySelector('#optional-information-checkbox')

checkBox.addEventListener('change', (e: Event) => {
  const { checked } = e.target as HTMLInputElement
  const addressElements = document.querySelectorAll('.input-wrapper.address')

  addressElements.forEach((addressEle: HTMLElement) => {
    if (checked) {
      addressEle.classList.remove('disabled')
      addressEle.querySelector('input').disabled = false
    } else {
      addressEle.classList.add('disabled')
      const inputEle = addressEle.querySelector('input')
      inputEle.disabled = true
      inputEle.value = ''
    }
  })
})

// find address handle
const addressFindBtn = document.querySelector('.input-wrapper.address button')
const addressPostal = document.querySelector(
  '.address-postal'
) as HTMLInputElement
const addressDefault = document.querySelector(
  '.address-default'
) as HTMLInputElement
const addressDetail = document.querySelector(
  '.address-detail'
) as HTMLInputElement

const findAddress = (e) => {
  if (addressFindBtn.parentElement.classList.contains('disabled')) {
    return
  }
  window.daum.postcode.load(() => {
    new window.daum.Postcode({
      oncomplete: ({ zonecode, address }) => {
        addressPostal.value = zonecode
        addressDefault.value = address
        addressPostal.disabled = true
        addressDefault.disabled = true
      },
    }).open()
  })
}
addressFindBtn.addEventListener('click', findAddress)
addressPostal.addEventListener('click', findAddress)
addressDefault.addEventListener('click', findAddress)

const signUpButton = document.querySelector('.register-btn')
signUpButton.addEventListener('click', (e: Event) =>
  onSubmitHandler(e, '/sign-up')
)
