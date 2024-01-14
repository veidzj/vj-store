import { AddProductController } from '@/presentation/controllers/product'
import { type AddProduct } from '@/domain/usecases/product/commands'

describe('AddProductController', () => {
  test('Should call AddProduct with correct values', async() => {
    class AddProductSpy implements AddProduct {
      public input: AddProduct.Input

      public async add(input: AddProduct.Input): Promise<void> {
        this.input = input
      }
    }
    const addProductSpy = new AddProductSpy()
    const sut = new AddProductController(addProductSpy)
    await sut.handle({
      name: '',
      description: '',
      price: 1,
      discountPercentage: 0,
      quantity: 1,
      category: '',
      imagesUrls: []
    })
    expect(addProductSpy.input).toEqual({
      name: '',
      description: '',
      price: 1,
      discountPercentage: 0,
      quantity: 1,
      category: '',
      imagesUrls: []
    })
  })
})
