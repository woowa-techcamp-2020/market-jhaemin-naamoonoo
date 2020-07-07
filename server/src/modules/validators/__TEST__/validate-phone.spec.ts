import { validatePhone } from '../validate-phone'

// truthy
test('Phone number has well-formatted like XXX-XXXX-XXXX be pass', () => {
  //given
  const validPhone = '010-1234-5678'
  const exprectedResult = true
  //when
  const testResult = validatePhone(validPhone)
  //then
  expect(testResult).toBe(exprectedResult)
})

// falsy
test('Phone number do not have - should be fail', () => {
  //given
  const invalidPhone = '01012345678'
  const exprectedResult = false
  //when
  const testResult = validatePhone(invalidPhone)
  //then
  expect(testResult).toBe(exprectedResult)
})

test('Phone number has country code should be fail', () => {
  //given
  const invalidPhone = '+82-010-6564-0328'
  const exprectedResult = false
  //when
  const testResult = validatePhone(invalidPhone)
  //then
  expect(testResult).toBe(exprectedResult)
})
