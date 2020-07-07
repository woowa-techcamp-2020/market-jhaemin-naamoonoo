import request from 'supertest'
import { app } from '../../app'

import { createUser, deleteUser } from '../../modules/database/schema/user'

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

  const {
    body: { token },
  } = await request(app).post('/api/sign-in').send(validInput).expect(200)
  // console.log(res.body)

  //when
  const {
    body: { currentUser },
  } = await request(app).get(`/api/current-user?token=${token}`).expect(200)

  expect(currentUser.userId).toBe(validInput.userId)
  await deleteUser({ userId: createdUser.userId })

  //then
  // expect(response.body.currentUser.email).toEqual('test@test.com')
})
