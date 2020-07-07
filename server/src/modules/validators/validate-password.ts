export const validatePassword = (password: string): boolean => {
  return password.match(/^[a-z0-9]{8,20}$/) !== null
}
