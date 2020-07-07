export const validateId = (id: string): boolean => {
  return id.match(/^[a-z0-9_-]{4,20}$/) !== null
}
