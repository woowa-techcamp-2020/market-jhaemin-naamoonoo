// /**
//  * @jest-environment jsdom
//  */

// import { fireEvent, getByText } from '@testing-library/dom'
// import '@testing-library/jest-dom/extend-expect'
// import { JSDOM } from 'jsdom'
// import fs from 'fs'
// import path from 'path'

// const html = fs.readFileSync(
//   path.resolve(__dirname, '../../views-html/sign-up.html'),
//   'utf8'
// )

// import {
//   checkEssentialPart,
//   inputWrappers,
// } from '../../../../client/src/sign-up/essential-part'

// jest.useFakeTimers()

// let dom: JSDOM
// let container: HTMLElement

// beforeEach(() => {
//   dom = new JSDOM(html, { runScripts: 'dangerously' })
//   container = dom.window.document.body
// })

// // describe('[input]', () => {
// //   it('input-wrapper should have valid-input class if input is valid', () => {
// //     //given
// //     const validUserId = 'test'
// //     const validClassName = 'valid-input'
// //     const inputWrapper = container.querySelector('.input-wrapper.id')
// //     const inputField = inputWrapper.querySelector('input')

// //     //when
// //     // const userId = inputWrappers.userId
// //     inputField.addEventListener('input', (e: Event) =>  e.target)
// //     // console.log(userId)
// //     fireEvent.focus(inputField)
// //     // fireEvent.change(inputField, { target: { value: validUserId } })

// //     //then
// //     setTimeout(() => {
// //       console.log(
// //         Array.from(container.querySelector('.input-wrapper.id').classList)
// //       )
// //       expect(inputField.value).toEqual(validUserId)
// //       expect(inputWrapper.classList.contains(validClassName)).toBeTruthy()
// //     }, 1000)

// //     jest.runAllTimers()
// //   })
// // })

// describe('[address checkbox]', () => {
//   it('input-wrapper should have valid-input class if input is valid', () => {
//     //given
//     const validUserId = 'test'
//     const validClassName = 'valid-input'
//     const addressChecker = container.querySelector(
//       '#optional-information-checkbox'
//     ) as HTMLInputElement

//     addressChecker.addEventListener('change', (e: Event) => {
//       const { checked } = e.target as HTMLInputElement
//       const addressElements = container.querySelectorAll(
//         '.input-wrapper.address'
//       )

//       addressElements.forEach((addressEle: HTMLElement) => {
//         if (checked) {
//           addressEle.classList.remove('disabled')
//           addressEle.querySelector('input').disabled = false
//         } else {
//           addressEle.classList.add('disabled')
//           const inputEle = addressEle.querySelector('input')
//           inputEle.disabled = true
//           inputEle.value = ''
//         }
//       })
//     })

//     //when
//     expect(addressChecker.checked).toBeFalsy()
//     fireEvent.click(addressChecker)
//     expect(addressChecker.checked).toBeTruthy()

//     const addressElements = container.querySelectorAll('.input-wrapper.address')
//     console.log(Array.from(addressElements))
//     addressElements.forEach((addressEle: HTMLElement) => {
//       console.log(Array.from(addressEle.classList))
//       expect(addressEle.classList.contains('disabled')).toBeFalsy()
//       expect(addressEle.querySelector('input').disabled).toBeFalsy()
//       //   addressEle.classList.remove('disabled')
//       //   addressEle.querySelector('input').disabled = false
//       // } else {
//       //   addressEle.classList.add('disabled')
//       //   const inputEle = addressEle.querySelector('input')
//       //   inputEle.disabled = true
//       //   inputEle.value = ''
//       // }
//     })

//     jest.runAllTimers()
//   })
// })
