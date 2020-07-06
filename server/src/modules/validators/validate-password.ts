export const validatePassword = (password: string): boolean => {
  const passwordLength = password.length

  if (passwordLength < 8 || passwordLength > 20) {
    return false
  }

  return password.match(/^[a-z0-9]+$/) !== null
}
