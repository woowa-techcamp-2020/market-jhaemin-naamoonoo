import { validateId } from '../validate-id'

// truthy
test('ID has 4 to 20 length, consists of only lowercase english, number, or _, - should be pass', () => {
  //given
  const validId = '-woowabros6_'
  const exprectedResult = true
  //when
  const testResult = validateId(validId)
  //then
  expect(testResult).toBe(exprectedResult)
})

// falsy
test('ID has less then 4 length should be fail', () => {
  //given
  const invalidId = 'abc'
  const exprectedResult = false
  //when
  const testResult = validateId(invalidId)
  //then
  expect(testResult).toBe(exprectedResult)
})

test('ID has more then 20 length should be fail', () => {
  //given
  const invalidId = 'abcdefghijklmnopqrstuvwxyz'
  const exprectedResult = false
  //when
  const testResult = validateId(invalidId)
  //then
  expect(testResult).toBe(exprectedResult)
})

test('ID has uppercase character should be fail', () => {
  //given
  const invalidId = 'woowaBros44'
  const exprectedResult = false
  //when
  const testResult = validateId(invalidId)
  //then
  expect(testResult).toBe(exprectedResult)
})

test('ID has special character excpet for - or _ should be fail', () => {
  //given
  const invalidId = 'woowa!'
  const exprectedResult = false
  //when
  const testResult = validateId(invalidId)
  //then
  expect(testResult).toBe(exprectedResult)
})
