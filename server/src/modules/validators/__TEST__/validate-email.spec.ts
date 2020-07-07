import { validateEmail } from '../validate-email'

// email => ID @ domain

// truthy
test('email has id and well formatted domain should be pass', () => {
  //given
  const validEmail = 'test@test.com'
  const expectedResult = true
  //when
  const testResult = validateEmail(validEmail)
  //then
  expect(testResult).toBe(expectedResult)
})

// falsy
test('email that @ is not existed should be fail', () => {
  //given
  const invalidEmail = 'awkensdlf'
  const expectedResult = false
  //when
  const testResult = validateEmail(invalidEmail)
  //then
  expect(testResult).toBe(expectedResult)
})

test('email has not formatted domain should be fail', () => {
  //given
  const invalidEmail = 'aweknfls@wknsklnsd'
  const expectedResult = false
  //when
  const testResult = validateEmail(invalidEmail)
  //then
  expect(testResult).toBe(expectedResult)
})

test('email that has no ID should be fail', () => {
  //given
  const invalidEmail = '@wawos.com'
  const expectedResult = false
  //when
  const testResult = validateEmail(invalidEmail)
  //then
  expect(testResult).toBe(expectedResult)
})

test('email has no ID and invalid format should be fail', () => {
  //given
  const invalidEmail = '@woowa'
  const expectedResult = false
  //when
  const testResult = validateEmail(invalidEmail)
  //then
  expect(testResult).toBe(expectedResult)
})
