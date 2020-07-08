import { validateName } from '../validate-name'

// truthy
test('Name has no number or special characters should be pass', () => {
  //given
  const validName = '우테켐'
  const expectedResult = true
  //when
  const testResult = validateName(validName)
  //then
  expect(testResult).toBe(expectedResult)
})

// falsy
test('Name has number should be fail', () => {
  //given
  const invalidName = '장해민1'
  const expectedResult = false
  //when
  const testResult = validateName(invalidName)
  //then
  expect(testResult).toBe(expectedResult)
})

test('Name has special character should be fail', () => {
  //given
  const invalidName = '남현우!'
  const expectedResult = false
  //when
  const testResult = validateName(invalidName)
  //then
  expect(testResult).toBe(expectedResult)
})
