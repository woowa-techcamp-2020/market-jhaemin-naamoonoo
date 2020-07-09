type FieldName =
  | 'id'
  | 'pw'
  | 'pw-confirm'
  | 'email'
  | 'name'
  | 'phone'
  | 'code'

export const setInputWrapper = ({
  fieldName,
  validator,
  onPressAction = () => {},
  onDebounce,
}: {
  fieldName: FieldName
  validator?: (
    value: string
  ) => Promise<[boolean, string?]> | [boolean, string?]
  onPressAction?: () => void
  onDebounce?: (value: string) => void
}) => {
  const isValid = { current: false }

  const wrapper = document.querySelector(
    `.input-wrapper.${fieldName}`
  ) as HTMLElement
  const input = wrapper.querySelector('input')
  const action = wrapper.querySelector('.action') as HTMLButtonElement

  const reset = () => {
    wrapper.classList.remove('invalid-input')
    wrapper.classList.remove('valid-input')
  }

  const checkValidation = () => isValid.current

  const getValue = () => input.value

  const display = (condition: boolean) => {
    if (condition) {
      wrapper.classList.remove('hidden')
      input.removeAttribute('tabIndex')
      return
    }

    wrapper.classList.add('hidden')
    input.tabIndex = -1
  }

  const toggleAction = (condition: boolean) => {
    if (!action) {
      return
    }

    if (condition) {
      action.classList.add('activated')
      console.log('activated')
      return
    }

    action.classList.remove('activated')
  }

  const setOk = () => {
    wrapper.classList.remove('invalid-input')
    wrapper.classList.add('valid-input')

    isValid.current = true

    toggleAction(true)

    action && action.addEventListener('click', onPressAction)
  }

  const setErrMsg = (msg: string) => {
    wrapper.classList.remove('valid-input')
    wrapper.classList.add('invalid-input')
    wrapper.querySelector('.msg-text').innerHTML = msg

    isValid.current = false
    console.log(`setErrMsg: ${msg}`)

    toggleAction(false)

    action && action.removeEventListener('click', onPressAction)
  }

  const replaceActionLabel = (label: string) => {
    action.innerHTML = label
  }

  let debounceTimeout = 0

  input.addEventListener('input', () => {
    if (debounceTimeout) {
      window.clearTimeout(debounceTimeout)
    }

    debounceTimeout = window.setTimeout(async () => {
      if (validator) {
        const validatorReturn = validator(input.value)
        const [isValid, errMsg] =
          validatorReturn instanceof Promise
            ? await validatorReturn
            : validatorReturn

        isValid ? setOk() : setErrMsg(errMsg)
      }

      onDebounce && onDebounce(input.value)
    }, 300)
  })

  return {
    wrapper,
    input,
    action,
    setErrMsg,
    setOk,
    reset,
    getValue,
    checkValidation,
    display,
    replaceActionLabel,
  }
}
