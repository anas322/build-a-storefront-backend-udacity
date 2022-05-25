import { UserModel } from '../../models/user'

const user = new UserModel()

describe('Test all user model functions', () => {
  it('Get all users Test', async (): Promise<void> => {
    const result = await user.index()

    expect(result?.length).toBe(2)
  })

  it('Get specific user depends on id test', async (): Promise<void> => {
    const result = await user.show(1)

    expect(result?.id).toBe(1)
    expect(result?.username).toBe('user1')
    expect(result?.firstname).toBe('test')
    expect(result?.lastname).toBe('test')
  })

  it('Create user Test (should be created)', async (): Promise<void> => {
    const result = await user.create({
      username: 'testUser',
      firstname: 'test',
      lastname: 'user',
      password: 'password',
    })

    expect(result).toBeTruthy()
  })

  it('Create user Test already EXIST (should be faild)', async (): Promise<void> => {
    const result = await user.create({
      username: 'user1',
      firstname: 'test',
      lastname: 'user',
      password: 'password',
    })

    expect(result).toBeFalsy()
  })
})

//Delete the created user after testing
afterAll(async (): Promise<void> => {
  await user.delete('testUser')
})
