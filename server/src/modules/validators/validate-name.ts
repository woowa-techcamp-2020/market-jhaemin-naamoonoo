export const validateName = (name: string): boolean => {
  return typeof name === 'string' && name.match(/^[a-zA-Z가-힣]+$/g) !== null
}
