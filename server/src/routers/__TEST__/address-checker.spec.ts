/**
 * @jest-environment jsdom
 */

import { fireEvent, getByText } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

const html = fs.readFileSync(
  path.resolve(__dirname, '../../views-html/sign-up.html'),
  'utf8'
)

jest.useFakeTimers()

let dom: JSDOM
let document: HTMLElement

beforeEach(() => {
  dom = new JSDOM(html, { runScripts: 'dangerously' })
  document = dom.window.document.body
})

// event handler for click checkbox of agree
const onAgreeToPutAddress = (e: Event) => {
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
}

describe('[checkbox for agreement of putting address ]', () => {
  it('it should render unchecked, and rest of inputs are disabled  by default', () => {
    //given
    const addressChecker = document.querySelector(
      '#optional-information-checkbox'
    ) as HTMLInputElement

    //when
    // rendererd

    //then
    expect(addressChecker.checked).toBeFalsy()

    const addressElements = document.querySelectorAll('.input-wrapper.address')
    addressElements.forEach((addressEle: HTMLElement) => {
      expect(addressEle.classList.contains('disabled')).toBeTruthy()
      expect(addressEle.querySelector('input').disabled).toBeTruthy()
    })
  })

  it('if checkbox clicked, child inputs should be usable', () => {
    //given
    const addressChecker = document.querySelector(
      '#optional-information-checkbox'
    ) as HTMLInputElement
    addressChecker.addEventListener('change', onAgreeToPutAddress)

    //when
    fireEvent.click(addressChecker)

    //then
    expect(addressChecker.checked).toBeTruthy()

    const addressElements = document.querySelectorAll('.input-wrapper.address')
    addressElements.forEach((addressEle: HTMLElement) => {
      expect(addressEle.classList.contains('disabled')).toBeFalsy()
      expect(addressEle.querySelector('input').disabled).toBeFalsy()
    })
  })
})
