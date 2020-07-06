import { validatePassword } from '../validate-password'

test('Validate password', () => {
  expect(validatePassword('1234567')).toBe(false)
  expect(validatePassword('qwertyuiopasdfghjklzx')).toBe(false)
  expect(validatePassword('123difj!@#')).toBe(false)

  expect(validatePassword('2817262617')).toBe(true)
  expect(validatePassword('weifhai1829')).toBe(true)
  expect(validatePassword('fkldjflwi28')).toBe(true)
})
