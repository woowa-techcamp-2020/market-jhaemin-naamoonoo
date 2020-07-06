import { validateId } from '../validate-id'

test('Validate ID', () => {
  expect(validateId('myi')).toBe(false)
  expect(validateId('qwertyuiopasdfghjklzx')).toBe(false)
  expect(validateId('**eifhwieo')).toBe(false)
  expect(validateId('difhei(&kd')).toBe(false)

  expect(validateId('hello1234')).toBe(true)
  expect(validateId('eiwheie')).toBe(true)
  expect(validateId('ei3ueu_')).toBe(true)
  expect(validateId('ei3ueu_-')).toBe(true)
  expect(validateId('weihfi_dif2')).toBe(true)
})
