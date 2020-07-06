import bcrypt from 'bcrypt'

export const encryptPassword = async (rawPassword: string) => {
  const salt = await bcrypt.genSalt()
  const hash = await bcrypt.hash(rawPassword, salt)
  return hash
}

export const comparePassword = async (rawPassword, hash) => {
  return await bcrypt.compare(rawPassword, hash)
}
