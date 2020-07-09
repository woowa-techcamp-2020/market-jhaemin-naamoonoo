export const validateUserId = (id: string): boolean => {
  return typeof id === 'string' && id.match(/^[a-z0-9_-]{4,20}$/) !== null
}
