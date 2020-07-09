import { Address } from '@@/../server/src/modules/database/schema/user'

declare global {
  interface Window {
    daum: any
  }
}

// checkbox handler
const checkBox = document.querySelector(
  '#optional-information-checkbox'
) as HTMLInputElement

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

export const isOptionalChecked = () => checkBox.checked
export const getAddress = (): Address => {
  const result = {} as Address

  if (addressPostal.textContent) {
    result.postalCode = parseInt(addressPostal.textContent)
  }

  if (addressDefault.textContent) {
    result.essentialAddress = addressDefault.textContent
  }

  if (addressDetail.textContent) {
    result.additionalAddress = addressDetail.textContent
  }

  return result
}
