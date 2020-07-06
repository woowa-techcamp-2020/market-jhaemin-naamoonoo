export const validateName = (name: string): boolean => {
  return name.match(/^[a-zA-Z가-힣]+$/g) !== null
}
