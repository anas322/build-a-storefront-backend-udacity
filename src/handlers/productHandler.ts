import { Router, Request, Response } from 'express'
import { ProductModel } from '../models/product'
import { auth } from '../middleware/auth'

const routes = Router()
const product = new ProductModel()

const index = async (_req: Request, res: Response): Promise<void> => {
  const result = await product.index()
  if (result) {
    res.json(result)
    return
  }
  res.send('no products founds')
  return
}

const show = async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.params.id)
  const result = await product.show(id)
  if (result) {
    res.json(result)
    return
  }
  res.send('now product found')
  return
}

const showByCategory = async (req: Request, res: Response): Promise<void> => {
  const cat: string = req.params.cat
  const result = await product.showByCategory(cat)
  if (result) {
    res.json(result)
    return
  }
  res.send('no product found')
  return
}

const create = async (req: Request, res: Response): Promise<void> => {
  const result = await product.create(req.body)
  if (result) {
    res.json(result)
    return
  }
  res.send('no product found')
  return
}

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const result = await product.delete(req.params.name)
  if (result) {
    res.json(result)
    return
  }
  res.json('something went wrong!')
  return
}

routes.get('/products', index)
routes.get('/products/:id', show)
routes.get('/products/category/:cat', showByCategory)
routes.post('/products', auth, create)
routes.delete('/products/:name', auth, deleteProduct)

export default routes
