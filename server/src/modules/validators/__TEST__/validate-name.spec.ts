import { validateName } from '../validate-name'

test('Validate Name', () => {
  expect(validateName('andy123')).toBe(false)
  expect(validateName('현우33^^')).toBe(false)
  expect(validateName('해민갓god%%')).toBe(false)
  expect(validateName('댜로쟈-ㅇㅇ')).toBe(false)

  expect(validateName('장해민')).toBe(true)
  expect(validateName('남현우')).toBe(true)
  expect(validateName('봉짱짱맨')).toBe(true)
})

// truthy
test('Name has no number or special characters should be pass', () => {
  //given
  const validName = '우테켐'
  const exprectedResult = true
  //when
  const testResult = validateName(validName)
  //then
  expect(testResult).toBe(exprectedResult)
})

// falsy
test('Name has number should be fail', () => {
  //given
  const invalidName = '장해민1'
  const exprectedResult = false
  //when
  const testResult = validateName(invalidName)
  //then
  expect(testResult).toBe(exprectedResult)
})

test('Name has special character should be fail', () => {
  //given
  const invalidName = '남현우!'
  const exprectedResult = false
  //when
  const testResult = validateName(invalidName)
  //then
  expect(testResult).toBe(exprectedResult)
})
