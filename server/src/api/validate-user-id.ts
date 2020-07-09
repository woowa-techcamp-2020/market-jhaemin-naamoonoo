import express from 'express'
import { isUniqueUserId } from '../modules/database/schema/user'

const router = express.Router()

router.post('/api/is-unique-user-id', async (req, res) => {
  const { userId } = req.body as { userId: string }

  const result = await isUniqueUserId(userId)

  res.json(result)
})

export { router as isUniqueUserIdRouter }
