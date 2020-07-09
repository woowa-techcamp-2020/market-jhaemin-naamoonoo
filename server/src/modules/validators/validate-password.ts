export const validatePassword = (password: string): boolean => {
  return (
    typeof password === 'string' && password.match(/^[a-z0-9]{8,20}$/) !== null
  )
}
