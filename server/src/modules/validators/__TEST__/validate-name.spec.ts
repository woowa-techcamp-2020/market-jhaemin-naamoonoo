import { validateName } from '../validate-name'

test('Validate password', () => {
  expect(validateName('andy123')).toBe(false)
  expect(validateName('현우33^^')).toBe(false)
  expect(validateName('해민갓god%%')).toBe(false)

  expect(validateName('장해민')).toBe(true)
  expect(validateName('남현우')).toBe(true)
  expect(validateName('봉짱짱맨')).toBe(true)
})
