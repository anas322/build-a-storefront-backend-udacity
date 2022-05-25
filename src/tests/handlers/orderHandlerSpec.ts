import app from '../../server'
import supertest from 'supertest'
import { CreateOrder } from '../../models/order'

const endpoint = supertest(app)

const order: CreateOrder = {
  user_id: 1,
  status: 'active',
  products: [
    {
      product_id: 1,
      quantity: 3,
    },

    {
      product_id: 2,
      quantity: 3,
    },
  ],
}
let newOrderId: number

describe('Test all order handler endpoints', async () => {
  it('test /orders endpoint to get all orders by user_id ', async (): Promise<void> => {
    const result = await endpoint
      .get('/orders/user/1')
      .set('authorization', ('Bearer ' + process.env.RETURN_TOKEN) as string)

    expect(result.status).toBe(200)
  })

  it('Test /orders/user/1/current endpoint to get the current order of user_id', async (): Promise<void> => {
    const response = await endpoint
      .get('/orders/user/1/current')
      .set('authorization', ('Bearer ' + process.env.RETURN_TOKEN) as string)

    expect(response.status).toBe(200)
  })

  it('Test /orders/user/1/complete endpoints to get the complete orders of user_id', async (): Promise<void> => {
    const response = await endpoint
      .get('/orders/user/1/complete')
      .set('authorization', ('Bearer ' + process.env.RETURN_TOKEN) as string)

    expect(response.status).toBe(200)
  })

  it('Test /orders/create endpoint to create new product ', async (): Promise<void> => {
    const response = await endpoint
      .post('/orders/create')
      .send(order)
      .set('authorization', ('Bearer ' + process.env.RETURN_TOKEN) as string)
    newOrderId = JSON.parse(response.text).id

    expect(response.status).toBe(200)
  })

  it('delete order Test', async (): Promise<void> => {
    const response = await endpoint
      .delete(`/orders/${newOrderId}/delete`)
      .set('authorization', ('Bearer ' + process.env.RETURN_TOKEN) as string)

    expect(response.status).toBe(200)
  })
})
