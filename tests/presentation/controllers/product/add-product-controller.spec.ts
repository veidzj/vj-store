import { AddProductController } from '@/presentation/controllers/product'
import { type AddProduct } from '@/domain/usecases/product/commands'
import { mockAddProductInput } from '@/tests/domain/mocks/product'

const mockRequest = (): AddProductController.Request => mockAddProductInput()

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
    const request = mockRequest()
    await sut.handle(request)
    expect(addProductSpy.input).toEqual(request)
  })
})
