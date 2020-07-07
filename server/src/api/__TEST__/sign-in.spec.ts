import request from 'supertest'
import { app } from '../../app'

import { createUser } from '../../modules/database/schema/user'

it('responds with details about the current user', async () => {
  const validInput = {
    userId: 'woowa444-_',
    password: 'abcde1234',
  }

  createUser({
    ...validInput,
    name: '우테켐',
    email: 'wwa@awas.com',
    phone: '010-6564-2222s',
  })
  //given

  //when
  const expectedResponse = await request(app)
    .post('/api/sign-in')
    .send(validInput)
    .expect(200)
  //then
  // expect(response.body.currentUser.email).toEqual('test@test.com')
})

// it('fails when an invalid password comes in', async () => {
//   await request(app)
//     .post('/api/users/signup')
//     .send({
//       email: 'test@test.com',
//       password: 'password',
//     })
//     .expect(201)

//   await request(app)
//     .post('/api/users/signin')
//     .send({
//       email: 'test@test.com',
//       password: 'pass',
//     })
//     .expect(400)
// })

// it('responds with a cookie when valid credentials are given', async () => {
//   await request(app)
//     .post('/api/users/signup')
//     .send({
//       email: 'test@test.com',
//       password: 'password',
//     })
//     .expect(201)

//   const response = await request(app)
//     .post('/api/users/signin')
//     .send({
//       email: 'test@test.com',
//       password: 'password',
//     })
//     .expect(200)

//   expect(response.get('Set-Cookie')).toBeDefined()
// })

// test('Sign in with valid Id and password should be pass', () => {
//   //given
//   const validInput = {
//     id: 'woowa444-_',
//     password: 'abcde1234',
//   }
//   const expectedResult = true

//   //when
//   const testResult = validInput

//   //then
//   expect(testResult).toBe(expectedResult)
// })
