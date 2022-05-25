import { Application } from 'express'

import userRoutes from './handlers/userHandler'
import productRoutes from './handlers/productHandler'
import orderRoutes from './handlers/orderHandler'

export const routes = (app: Application) => {
  app.use(userRoutes)
  app.use(productRoutes)
  app.use(orderRoutes)
}
