import client from '../database'

enum statusValue {
  'active',
  'complete',
}

export interface OrderType {
  id?: number
  quantity: number
  user_id: number
  product_id: number
  status: statusValue
}
export interface baseOrder {
  product_id: number
  quantity: number
}
export interface CreateOrder {
  user_id: number
  status: string
  products: baseOrder[]
}

export class OrderModel {
  //get all orders by user_id
  async index(user_id: number): Promise<OrderType[] | null> {
    try {
      const conn = await client.connect()
      const sql =
        'SELECT user_id, status, product_id, quantity FROM orders INNER JOIN order_products ON orders.id = order_products.order_id WHERE orders.user_id = $1'

      const result = await conn.query(sql, [user_id])

      //check if there is any result
      if (result.rowCount) {
        return result.rows[0]
      }
      return null //no rows found
    } catch (err) {
      throw new Error(`SQL Error: ${err}`)
    }
  }

  //show Current Order by user_id
  async getCurrentOrder(user_id: number): Promise<OrderType[] | null> {
    try {
      const conn = await client.connect()
      const sql =
        'SELECT user_id, status, product_id, quantity FROM orders INNER JOIN order_products ON orders.id = order_products.order_id WHERE orders.user_id = $1 ORDER BY order_id DESC LIMIT 1'
      const result = await conn.query(sql, [user_id])
      conn.release()
      if (result.rowCount) {
        return result.rows
      }
      return null //no rows found
    } catch (err) {
      console.log(err)

      throw new Error(`SQL Error: ${err}`)
    }
  }

  //show completed Orders by user_id
  async getCompletedOrders(user_id: number): Promise<OrderType[] | null> {
    try {
      const conn = await client.connect()
      const sql =
        'SELECT user_id, status, product_id, quantity FROM orders INNER JOIN order_products ON orders.id = order_products.order_id WHERE orders.user_id = $1 AND orders.status = $2'
      const result = await conn.query(sql, [user_id, 'complete'])
      conn.release()
      if (result.rowCount) {
        return result.rows
      }
      return null //no rows found
    } catch (err) {
      throw new Error(`SQL Error: ${err}`)
    }
  }

  // create new order
  async create(product: CreateOrder): Promise<CreateOrder[] | null> {
    try {
      const { user_id, status, products } = product
      const conn = await client.connect()
      const ordersSql = `SELECT * FROM users WHERE id = $1`
      const res = await conn.query(ordersSql, [user_id])

      if (res.rowCount) {
        const sql =
          'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *'
        const { rows } = await conn.query(sql, [user_id, status])
        const order = rows[0]

        const orderProducts = []
        const orderProductsSql =
          'INSERT INTO order_products(order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING product_id, quantity '
        for (const prd of products) {
          const orderProductsResult = await conn.query(orderProductsSql, [
            order.id,
            prd.product_id,
            prd.quantity,
          ])
          orderProducts.push(orderProductsResult.rows[0])
        }

        conn.release()

        return {
          ...order,
          products: orderProducts,
        }
      }
      return null
    } catch (err) {
      throw new Error(`SQL Error: ${err}`)
    }
  }

  async delete(order_id: number): Promise<number | null> {
    try {
      const conn = await client.connect()
      const SQL = 'SELECT FROM orders WHERE id = $1'
      const orderResult = await conn.query(SQL, [order_id])
      if (orderResult.rowCount) {
        const sql = 'DELETE FROM order_products WHERE order_id = $1'
        await conn.query(sql, [order_id])

        const Sql = 'DELETE FROM orders WHERE id = $1'
        const result = await conn.query(Sql, [order_id])

        return result.rowCount
      }
      return null
    } catch (err) {
      throw new Error(`SQL Error: ${err}`)
    }
  }
}
