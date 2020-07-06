const validateId = (id: string): boolean => {
  const idLength = id.length

  if (idLength < 4 || idLength > 20) {
    return false
  }

  return id.match(/^[a-z0-9_-]+$/) !== null
}

export default validateId
