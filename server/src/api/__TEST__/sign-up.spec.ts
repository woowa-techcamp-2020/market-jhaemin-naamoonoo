import { UserInfo, deleteUser } from '@/modules/database/schema/user'

import { SignUpResponse } from '../sign-up'
import { app } from '../../app'
import request from 'supertest'

test('Sign up with all valid information', async (done) => {
  // given
  const validUserInfo: UserInfo = {
    userId: 'fameu5e',
    password: '12345678',
    email: 'io@jhaemin.com',
    name: '장해민',
    phone: '010-5520-3618',
  }

  await deleteUser({ userId: validUserInfo.userId })

  const expectedResult: SignUpResponse = {}

  const response = await request(app).post('/sign-up').send(validUserInfo)

  expect(response.body).toEqual(expectedResult)

  await deleteUser({ userId: validUserInfo.userId })

  done()
})

test('Sign up with wrong email format', async (done) => {
  // given
  const invalidUserInfo: UserInfo = {
    userId: 'fameu6e',
    password: '12345678',
    email: 'io@',
    name: '장해민',
    phone: '010-5520-3618',
  }

  const expectedResult: SignUpResponse = {
    email: {
      res: false,
      err: '이메일 error',
    },
  }

  const response = await request(app).post('/sign-up').send(invalidUserInfo)

  await deleteUser({ userId: invalidUserInfo.userId })

  expect(response.body).toEqual(expectedResult)

  done()
})
