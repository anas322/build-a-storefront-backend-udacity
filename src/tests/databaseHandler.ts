import client from '../database'

export const DatabaseEat = async () => {
  try {
    const conn = await client.connect()
    const sql =
      "INSERT INTO users(username,firstname,lastname,password) values ('user1','test','test','password'),('user2','test','test','password');INSERT INTO products(name,price,category) values ('cherry','40','fruits'),('tomatto','50','vegetables'),('watermelon','60','vegetables');INSERT INTO orders(user_id,status) VALUES (1,'active'),(1,'complete');INSERT INTO order_products(order_id,product_id,quantity) VALUES (1,1,5),(2,1,5);"
    await conn.query(sql)
  } catch (err) {
    throw new Error(`SQL ERROR: ${err}`)
  }
}

export const DatabaseHungry = async () => {
  try {
    const conn = await client.connect()
    const sql =
      'DROP TABLE order_products;DROP TABLE orders;DROP TYPE mood;DROP TABLE products;DROP TABLE users;TRUNCATE TABLE migrations;'
    await conn.query(sql)
  } catch (err) {
    throw new Error(`SQL ERROR: ${err}`)
  }
}
