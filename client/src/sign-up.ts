import Validators from '../../server/src/modules/validators'

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
