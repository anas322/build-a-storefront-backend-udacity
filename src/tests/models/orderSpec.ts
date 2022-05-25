import { OrderModel } from '../../models/order'

const order = new OrderModel()

describe('Test all orders model functions', () => {
  it('Get all orders by user_id Test (User EXIST)', async (): Promise<void> => {
    const result = await order.index(1)

    expect(result).toBeTruthy()
  })

  it('Get all orders by user_id Test (User NOT EXIST)', async (): Promise<void> => {
    const result = await order.index(10)

    expect(result).toBeFalsy()
  })

  it('show Current Order by user_id Test (User EXIST)', async (): Promise<void> => {
    const result = await order.getCurrentOrder(1)

    expect(result?.length).toBeTruthy()
  })

  it('show Current Order by user_id Test (User Not EXIST)', async (): Promise<void> => {
    const result = await order.getCurrentOrder(10)

    expect(result?.length).toBeFalsy()
  })

  it('show completed Orders by user_id Test (User EXIST)', async (): Promise<void> => {
    const result = await order.getCompletedOrders(1)

    expect(result?.length).toBe(1)
  })
})
