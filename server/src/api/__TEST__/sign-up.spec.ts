import { SignUpResponse } from '../sign-up'
import { UserInfo } from '../../modules/database/schema/user'
import { app } from '../../app'
import request from 'supertest'

test('Sign up with all valid information should be passed', (done) => {
  // given
  const validUserInfo: UserInfo = {
    userId: 'fameu5e',
    password: '12345678',
    email: 'io@jhaemin.com',
    name: '장해민',
    phone: '010-5520-3618',
  }

  const expectedResult: SignUpResponse = {}

  request(app)
    .post('/sign-up')
    .send(validUserInfo)
    .then((response) => {
      expect(response.body).toEqual(expectedResult)
      done()
    })
})

test('Sign up with wrong email format should not be passed', (done) => {
  // given
  const validUserInfo: UserInfo = {
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

  request(app)
    .post('/sign-up')
    .send(validUserInfo)
    .then((response) => {
      expect(response.body).toEqual(expectedResult)
      done()
    })
})
