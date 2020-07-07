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

  const expectedResult: SignUpResponse = {
    userId: {
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
  }

  request(app)
    .post('/sign-up')
    .send(validUserInfo)
    .then((response) => {
      expect(response.body).toEqual(expectedResult)
      done()
    })
})

test('Sign up with short id should not be passed', (done) => {
  // given
  const validUserInfo: UserInfo = {
    userId: 'fam',
    password: '12345678',
    email: 'io@jhaemin.com',
    name: '장해민',
    phone: '010-5520-3618',
  }

  const expectedResult: SignUpResponse = {
    userId: {
      res: false,
      // TODO: Use constant error message
      err: '',
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
  }

  request(app)
    .post('/sign-up')
    .send(validUserInfo)
    .then((response) => {
      expect(response.body).toEqual(expectedResult)
      done()
    })
})
