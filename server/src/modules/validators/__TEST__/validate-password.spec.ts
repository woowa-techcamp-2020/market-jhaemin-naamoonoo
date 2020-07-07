import { validatePassword } from '../validate-password'

// truthy
test('Password has 8 to 20 length, consists of only eng characters and number, number should be pass', () => {
  //given
  const validPassword = 'woowabros6'
  const exprectedResult = true
  //when
  const testResult = validatePassword(validPassword)
  //then
  expect(testResult).toBe(exprectedResult)
})

// falsy
test('Password has less than 8 length should be fail', () => {
  //given
  const invalidPassword = 'asssabc'
  const exprectedResult = false
  //when
  const testResult = validatePassword(invalidPassword)
  //then
  expect(testResult).toBe(exprectedResult)
})

test('Password has more then 20 length should be fail', () => {
  //given
  const invalidPassword = 'abcdefghijklmnopqrstuvwxyz'
  const exprectedResult = false
  //when
  const testResult = validatePassword(invalidPassword)
  //then
  expect(testResult).toBe(exprectedResult)
})

test('Password has special character should be fail', () => {
  //given
  const invalidPassword = '@@woowaaw!'
  const exprectedResult = false
  //when
  const testResult = validatePassword(invalidPassword)
  //then
  expect(testResult).toBe(exprectedResult)
})
