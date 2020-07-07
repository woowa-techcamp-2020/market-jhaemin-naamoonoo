import { validateEmail } from '../validate-email'

// email => ID @ domain

// truthy
test('email has id and well formatted domain should be pass', () => {
  //given
  const validEmail = 'test@test.com'
  const exprectedResult = true
  //when
  const testResult = validateEmail(validEmail)
  //then
  expect(testResult).toBe(exprectedResult)
})

// falsy
test('email that @ is not existed should be fail', () => {
  //given
  const invalidEmail = 'awkensdlf'
  const exprectedResult = false
  //when
  const testResult = validateEmail(invalidEmail)
  //then
  expect(testResult).toBe(exprectedResult)
})

test('email has not formatted domain should be fail', () => {
  //given
  const invalidEmail = 'aweknfls@wknsklnsd'
  const exprectedResult = false
  //when
  const testResult = validateEmail(invalidEmail)
  //then
  expect(testResult).toBe(exprectedResult)
})

test('email that has no ID should be fail', () => {
  //given
  const invalidEmail = '@wawos.com'
  const exprectedResult = false
  //when
  const testResult = validateEmail(invalidEmail)
  //then
  expect(testResult).toBe(exprectedResult)
})

test('email has no ID and invalid format should be fail', () => {
  //given
  const invalidEmail = '@woowa'
  const exprectedResult = false
  //when
  const testResult = validateEmail(invalidEmail)
  //then
  expect(testResult).toBe(exprectedResult)
})
