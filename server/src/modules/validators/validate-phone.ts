export const validatePhone = (phone: string): boolean => {
  return (
    typeof phone === 'string' &&
    phone.match(/^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/) !== null
  )
}
