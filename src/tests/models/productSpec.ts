import { ProductModel } from '../../models/product'

const product = new ProductModel()

describe('Test all products model functions', () => {
  it('Get all products Test', async (): Promise<void> => {
    const result = await product.index()

    expect(result?.length).toBe(3)
  })

  it('show specific product depends on id Test', async (): Promise<void> => {
    const result = await product.show(1)

    expect(result?.name).toBe('cherry')
    expect(result?.price).toBe('40')
    expect(result?.category).toBe('fruits')
  })

  it('show specific products depends on category', async (): Promise<void> => {
    const result = await product.showByCategory('vegetables')
    expect(result?.length).toBe(2)
  })

  it('create new product', async (): Promise<void> => {
    const result = await product.create({
      name: 'productName',
      price: '50',
      category: 'categoryName',
    })

    expect(result?.length).toBe(1)
  })

  it('delete product by name test', async (): Promise<void> => {
    const result = await product.delete('productName')

    expect(result).toBe(1)
  })
})
