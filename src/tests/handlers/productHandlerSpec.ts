import app from '../../server'
import supertest from 'supertest'
import { ProductType } from '../../models/product'

const endpoint = supertest(app)

const product: ProductType = {
  name: 'productName',
  price: '10',
  category: 'categoryName',
}

describe('Test all product handler endpoints', async () => {
  it('test /products endpoint to get all products', async (): Promise<void> => {
    const result = await endpoint.get('/products')

    expect(result.status).toBe(200)
  })

  it('Test /product/1 endpoint to show specific product depends on id', async (): Promise<void> => {
    const response = await endpoint.get('/products/1')
    expect(response.status).toBe(200)
  })

  it('Test /products/category/fruits endpoints to show specific products depends on category', async (): Promise<void> => {
    const response = await endpoint.get('/products/category/fruits')

    expect(response.status).toBe(200)
  })

  it('Test /products endpoint to create new product ', async (): Promise<void> => {
    const response = await endpoint
      .post('/products')
      .send(product)
      .set('authorization', ('Bearer ' + process.env.RETURN_TOKEN) as string)

    expect(response.status).toBe(200)
  })

  it('delete product Test', async (): Promise<void> => {
    const response = await endpoint
      .delete('/products/productName')
      .set('authorization', ('Bearer ' + process.env.RETURN_TOKEN) as string)

    expect(response.status).toBe(200)
  })
})
