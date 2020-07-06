import { validateEmail } from '../validate-email'

test('Validate Email', () => {
  expect(validateEmail('awkensdlf')).toBe(false)
  expect(validateEmail('aweknfls@wknsklnsd')).toBe(false)
  expect(validateEmail('@anknslk')).toBe(false)
  expect(validateEmail('@andklw.com')).toBe(false)

  expect(validateEmail('abc@abc.com')).toBe(true)
  expect(validateEmail('test@test.com')).toBe(true)
  expect(validateEmail('naamoonoo.y@gmail.com')).toBe(true)
  expect(validateEmail('woowa@friends.co.kr')).toBe(true)
  expect(validateEmail('hello@world.com')).toBe(true)
})
