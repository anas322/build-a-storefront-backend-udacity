import client from '../database'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export interface UserType {
  id?: number
  username: string
  firstname: string
  lastname: string
  password: string
}

export class UserModel {
  generateToken(username: string): string {
    return jwt.sign({ username }, process.env.JWT_PASS as string)
  }

  // get all users
  async index(): Promise<UserType[] | null> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM users'
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

  //show specific user depends on id
  async show(id: number): Promise<UserType | null> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM users WHERE id = $1'
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

  //create new user
  async create(user: UserType): Promise<string | null> {
    //check if username is already exist
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM users WHERE username = $1'
      const res = await conn.query(sql, [user.username])
      if (res.rows.length) {
        return null
      }
      const pepper = process.env.BCRYPT_PASSWORD as string
      const salt = process.env.SALT_ROUNDS as string

      const hash: string = bcrypt.hashSync(
        user.password + pepper,
        parseInt(salt)
      )

      try {
        const conn = await client.connect()
        const sql =
          'INSERT INTO users (username,firstName,lastName,password) VALUES ($1, $2, $3, $4) RETURNING *'
        const result = await conn.query(sql, [
          user.username,
          user.firstname,
          user.lastname,
          hash,
        ])
        conn.release()

        const username: string = result.rows[0].username
        const token: string = this.generateToken(username)

        return token
      } catch (err) {
        throw new Error(`SQL Error: ${err}`)
      }
    } catch (err) {
      throw new Error(`SQL Error: ${err}`)
    }
  }

  //delete user
  async delete(username: string): Promise<UserType | null> {
    try {
      const conn = await client.connect()
      const sql = 'DELETE FROM users WHERE username = $1 RETURNING *'
      const result = await conn.query(sql, [username])

      conn.release()

      if (result.rowCount) {
        return result.rows[0]
      }
      return null
    } catch (err) {
      throw new Error(`SQL Error: ${err}`)
    }
  }
}
