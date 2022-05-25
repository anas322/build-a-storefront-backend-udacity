import { Router, Request, Response } from 'express'
import { auth } from '../middleware/auth'
import { UserModel } from '../models/user'

const routes = Router()
const user = new UserModel() //user instance

//get all users
const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await user.index()

    if (result) {
      res.json(result)
      return
    }
    res.send('no users found')
    return
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

//show user by id
const show = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id)
  try {
    const result = await user.show(id)

    if (result) {
      res.json(result)
      return
    }
    res.send('no user found')
    return
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

//create new user
const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await user.create(req.body)

    //return token if exist
    if (result) {
      res.json(result)
      return
    }
    res.send('username is taken, try another one')
    return
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

//delete user
const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await user.delete(req.params.username)
    //check if the user is deleted
    if (result) {
      res.json(result)
      return
    }
    res.send('something went wrong!')
    return
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

routes.get('/users', auth, index)
routes.get('/users/:id', auth, show)
routes.post('/users', create)
routes.delete('/users/:username', auth, deleteUser)
export default routes
