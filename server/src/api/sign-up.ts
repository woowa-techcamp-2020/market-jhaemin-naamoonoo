import { UserInfo } from '@/modules/database/schema/user'
import express from 'express'

const router = express.Router()

type FieldResponse = {
  res: boolean
  err: string | null
}

export type SignUpResponse = {
  [K in keyof UserInfo]: FieldResponse
}

// TODO: Use body validation middleware
router.post('/sign-up', (req, res) => {
  res.json({
    id: {
      res: true,
      err: null,
    },
    password: {
      res: true,
      err: null,
    },
    email: {
      res: true,
      err: null,
    },
    name: {
      res: true,
      err: null,
    },
    phone: {
      res: true,
      err: null,
    },
  } as SignUpResponse)
})

export { router as signUpRouter }
