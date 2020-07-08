import { validateUserId } from '../validate-user-id'

// truthy
test('ID has 4 to 20 length, consists of only lowercase english, number, or _, - should be pass', () => {
  //given
  const validId = '-woowabros6_'
  const expectedResult = true
  //when
  const testResult = validateUserId(validId)
  //then
  expect(testResult).toBe(expectedResult)
})

// falsy
test('ID has less then 4 length should be fail', () => {
  //given
  const invalidId = 'abc'
  const expectedResult = false
  //when
  const testResult = validateUserId(invalidId)
  //then
  expect(testResult).toBe(expectedResult)
})

test('ID has more then 20 length should be fail', () => {
  //given
  const invalidId = 'abcdefghijklmnopqrstuvwxyz'
  const expectedResult = false
  //when
  const testResult = validateUserId(invalidId)
  //then
  expect(testResult).toBe(expectedResult)
})

test('ID has uppercase character should be fail', () => {
  //given
  const invalidId = 'woowaBros44'
  const expectedResult = false
  //when
  const testResult = validateUserId(invalidId)
  //then
  expect(testResult).toBe(expectedResult)
})

test('ID has special character excpet for - or _ should be fail', () => {
  //given
  const invalidId = 'woowa!'
  const expectedResult = false
  //when
  const testResult = validateUserId(invalidId)
  //then
  expect(testResult).toBe(expectedResult)
})
