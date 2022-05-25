import { Request, Response, NextFunction } from 'express'
import Jwt from 'jsonwebtoken'

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader: string | undefined = req.headers.authorization

  const token: string = authHeader?.split(' ')[1] ?? ' '

  try {
    Jwt.verify(token, process.env.JWT_PASS as string)

    next()
  } catch (err) {
    res.status(401)

    res.json(`invalid token ${err}`)
    return false
  }
}
