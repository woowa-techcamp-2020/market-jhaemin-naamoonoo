import { validatePhone } from '../validate-phone'

test('Validate password', () => {
  expect(validatePhone('01065640329')).toBe(false)
  expect(validatePhone('+8201065640329')).toBe(false)
  expect(validatePhone('070')).toBe(false)

  expect(validatePhone('010-6564-0329')).toBe(true)
  expect(validatePhone('010-4444-3928')).toBe(true)
  expect(validatePhone('017-3232-3242')).toBe(true)
})
