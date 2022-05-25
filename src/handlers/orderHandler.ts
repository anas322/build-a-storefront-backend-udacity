import { Router, Request, Response } from 'express'
import { auth } from '../middleware/auth'
import { OrderModel, baseOrder } from '../models/order'

const routes = Router()
const order = new OrderModel() //order instance

//get all orders by order_id
const index = async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.params.id)
  const result = await order.index(id)
  if (result) {
    res.json(result)
    return
  }
  res.send('No result found to this user')
  return
}

//show Current Order by user_id
const getCurrentOrder = async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.params.id)
  const result = await order.getCurrentOrder(id)

  if (result) {
    res.json(result)
    return
  }
  res.send('No result found to this user')
  return
}

// show completed Orders by user_id
const getCompletedOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id: number = parseInt(req.params.id)
  const result = await order.getCompletedOrders(id)

  if (result) {
    res.json(result)
    return
  }
  res.send("This user doesn'nt have any completed orders")
  return
}

// create new order
const create = async (req: Request, res: Response): Promise<void> => {
  const user_id: number = parseInt(req.body.user_id) as unknown as number
  const status: string = req.body.status as unknown as string
  const products = req.body.products as unknown as baseOrder[]

  if (!user_id || !status || !products.length) {
    res.send(
      'some parameters are missing!, please make sure all parameters are provided :)'
    )
    return
  }

  const result = await order.create({ user_id, status, products })

  if (result) {
    res.json(result)
    return
  }
  res.send('User not found!')
  return
}

// Delete order
const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  const order_id: number = parseInt(req.params.order_id) as unknown as number
  const result = await order.delete(order_id)

  if (result) {
    res.json(result)
    return
  }
  res.send('order not found!')
  return
}

routes.get('/orders/user/:id', auth, index)
routes.get('/orders/user/:id/current', auth, getCurrentOrder)
routes.get('/orders/user/:id/complete', auth, getCompletedOrders)
routes.post('/orders/create', auth, create)
routes.delete('/orders/:order_id/delete', auth, deleteOrder)

export default routes
