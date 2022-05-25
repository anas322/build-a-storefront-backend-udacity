import client from '../database'

export interface ProductType {
  id?: number
  name: string
  price: string
  category: string
}

export class ProductModel {
  //get all products
  async index(): Promise<ProductType[] | null> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM products'
      const result = await conn.query(sql)
      conn.release()

      if (result.rowCount) {
        return result.rows
      }

      return null
    } catch (err) {
      throw new Error(`SQL Error: ${err}`)
    }
  }

  //show specific product depends on id
  async show(id: number): Promise<ProductType | null> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM products WHERE id = $1'
      const result = await conn.query(sql, [id])
      conn.release()

      if (result.rowCount) {
        return result.rows[0]
      }
      return null
    } catch (err) {
      throw new Error(`SQL Error: ${err}`)
    }
  }

  //show specific products depends on category
  async showByCategory(cat: string): Promise<ProductType[] | null> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM products WHERE category = $1'
      const result = await conn.query(sql, [cat])
      conn.release()

      if (result.rowCount) {
        return result.rows
      }
      return null
    } catch (err) {
      throw new Error(`SQL Error: ${err}`)
    }
  }

  //create new product
  async create(product: ProductType): Promise<ProductType[] | null> {
    try {
      const conn = await client.connect()
      const sql =
        'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *'
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
      ])
      conn.release()

      if (result.rowCount) {
        return result.rows
      }
      return null
    } catch (err) {
      throw new Error(`SQL Error: ${err}`)
    }
  }

  //delete product by name
  async delete(name: string): Promise<number | null> {
    try {
      const conn = await client.connect()
      const sql = 'DELETE FROM products WHERE name = $1 RETURNING *'
      const result = await conn.query(sql, [name])
      conn.release()

      if (result.rowCount) {
        return result.rowCount
      }
      return null
    } catch (err) {
      throw new Error(`SQL Error: ${err}`)
    }
  }
}
