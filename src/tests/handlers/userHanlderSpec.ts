import supertest from 'supertest'
import app from '../../server'
import { UserType } from '../../models/user'
const endpoint = supertest(app)

const user: UserType = {
  username: 'testUser',
  firstname: 'user',
  lastname: 'test',
  password: 'password',
}

describe('Test all user hanlder endpoints', () => {
  it('Test /users endpoints to get all users', async (): Promise<void> => {
    const response = await endpoint
      .get('/users')
      .set('authorization', ('Bearer ' + process.env.RETURN_TOKEN) as string)

    expect(response.status).toBe(200)
  })

  it('Test /users/1 endpoints to show specific user', async (): Promise<void> => {
    const response = await endpoint
      .get('/users/1')
      .set('authorization', ('Bearer ' + process.env.RETURN_TOKEN) as string)

    expect(response.status).toBe(200)
  })

  it('Test /users endpoints to create new user [post request]', async (): Promise<void> => {
    const response = await endpoint.post('/users').send(user)

    expect(response.status).toBe(200)
  })

  it('delete user Test', async (): Promise<void> => {
    const response = await endpoint
      .delete('/users/testUser')
      .set('authorization', ('Bearer ' + process.env.RETURN_TOKEN) as string)

    expect(response.status).toBe(200)
  })
})
