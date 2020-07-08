function toggleMsgActivation(element: HTMLElement | Element) {
  element.classList.toggle('msg-activated')
}

const idInputWrapper = document.querySelector('.input-wrapper.id')
const idInput = idInputWrapper.querySelector('input')

idInput.addEventListener('focus', () => {
  toggleMsgActivation(idInputWrapper)
})

idInput.addEventListener('blur', () => {
  toggleMsgActivation(idInputWrapper)
})
