import { validatePassword } from '../validate-password'

// truthy
test('Password has 8 to 20 length, consists of only eng characters and number, number should be pass', () => {
  //given
  const validPassword = 'woowabros6'
  const expectedResult = true
  //when
  const testResult = validatePassword(validPassword)
  //then
  expect(testResult).toBe(expectedResult)
})

// falsy
test('Password has less than 8 length should be fail', () => {
  //given
  const invalidPassword = 'asssabc'
  const expectedResult = false
  //when
  const testResult = validatePassword(invalidPassword)
  //then
  expect(testResult).toBe(expectedResult)
})

test('Password has more then 20 length should be fail', () => {
  //given
  const invalidPassword = 'abcdefghijklmnopqrstuvwxyz'
  const expectedResult = false
  //when
  const testResult = validatePassword(invalidPassword)
  //then
  expect(testResult).toBe(expectedResult)
})

test('Password has special character should be fail', () => {
  //given
  const invalidPassword = '@@woowaaw!'
  const expectedResult = false
  //when
  const testResult = validatePassword(invalidPassword)
  //then
  expect(testResult).toBe(expectedResult)
})
