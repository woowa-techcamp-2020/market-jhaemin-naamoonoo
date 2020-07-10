import { privacyPolicy, terms } from './term-content'

const modal = document.querySelector('.modal')

function setModalContent(content: string) {
  modal.querySelector('article').innerHTML = content
}

function showModal() {
  modal.classList.add('visible')
}

function hideModal() {
  modal.classList.remove('visible')
}

;(document.querySelector('.modal .bg') as HTMLElement).addEventListener(
  'click',
  () => {
    hideModal()
  }
)
;(document.querySelector('.modal .close') as HTMLElement).addEventListener(
  'click',
  () => {
    hideModal()
  }
)

const baeminTermBtn = document.querySelector(
  '.baemin-term-btn'
) as HTMLButtonElement

baeminTermBtn.addEventListener('click', () => {
  setModalContent(terms.replace(/(?:\r\n|\r|\n)/g, '<br>'))
  showModal()
})

const baeminPrivacyPolicyBtn = document.querySelector(
  '.privacy-policy-btn'
) as HTMLButtonElement

console.log(baeminPrivacyPolicyBtn)

baeminPrivacyPolicyBtn.addEventListener('click', () => {
  setModalContent(privacyPolicy.replace(/(?:\r\n|\r|\n)/g, '<br>'))
  showModal()
})
