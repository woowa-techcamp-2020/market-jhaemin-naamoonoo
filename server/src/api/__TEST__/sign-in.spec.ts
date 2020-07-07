import request from 'supertest'
import { app } from '../../app'

import {
  createUser,
  deleteUser,
  UserInfo,
} from '../../modules/database/schema/user'

it('sign in with valid userId and password should be pass', async () => {
  //given
  const validInput = {
    userId: 'woowa444-_',
    password: 'abcde1234',
  }

  const [err, createdUser] = await createUser({
    ...validInput,
    name: '우테켐',
    email: 'wwa@awas.com',
    phone: '010-6564-2222s',
  })

  //when
  const expectedResponse = await request(app)
    .post('/api/sign-in')
    .send(validInput)
    .expect(200)

  await deleteUser({ userId: createdUser.userId })

  //then
  // expect(response.body.currentUser.email).toEqual('test@test.com')
})

it('sign in with none existed userId should be fail', async () => {
  const invalidInput = {
    userId: 'WWdsw444-_',
    password: 'abcde1234',
  }

  const [err, createdUser] = await createUser({
    ...invalidInput,
    name: '우테켐',
    email: 'wwa@awas.com',
    phone: '010-6564-2222s',
  })
  //given

  //when
  const expectedResponse = await request(app)
    .post('/api/sign-in')
    .send({ ...invalidInput, userId: 'w4wws4' })
    .expect(400)

  await deleteUser({ userId: createdUser.userId })
  //then
  // expect(response.body.currentUser.email).toEqual('test@test.com')
})

it('sign in with wrong password should be fail', async () => {
  const invalidInput = {
    userId: 'test33-_',
    password: 'abcde1234',
  }

  const [err, createdUser] = await createUser({
    ...invalidInput,
    name: '우테켐',
    email: 'wwa@awas.com',
    phone: '010-6564-2222s',
  })
  //given

  //when
  const expectedResponse = await request(app)
    .post('/api/sign-in')
    .send({ ...invalidInput, password: 'wnskdws' })
    .expect(400)

  await deleteUser({ userId: createdUser.userId })
  //then
  // expect(response.body.currentUser.email).toEqual('test@test.com')
})

it('sign in with invalidInput should be fail', async () => {
  const invalidInput = {
    userId: 's#FDw444-_',
    password: 'abc@de1!234',
  }

  const [err, createdUser] = await createUser({
    ...invalidInput,
    name: '우테켐',
    email: 'wwa@awas.com',
    phone: '010-6564-2222s',
  })
  //given

  //when
  const expectedResponse = await request(app)
    .post('/api/sign-in')
    .send({ ...invalidInput, password: 'wnskdws' })
    .expect(400)

  await deleteUser({ userId: createdUser.userId })
  //then
  // expect(response.body.currentUser.email).toEqual('test@test.com')
})
