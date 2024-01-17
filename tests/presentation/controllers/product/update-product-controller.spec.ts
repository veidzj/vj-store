import { mockUpdateProductInput } from '@/tests/domain/mocks/product'
import { type UpdateProduct } from '@/domain/usecases/product/commands'
import { UpdateProductController } from '@/presentation/controllers/product'

const mockRequest = (): UpdateProductController.Request => mockUpdateProductInput()

describe('UpdateProductController', () => {
  test('Should call UpdateProduct with correct values', async() => {
    class UpdateProductSpy implements UpdateProduct {
      public input: UpdateProduct.Input

      public async update(input: UpdateProduct.Input): Promise<void> {
        this.input = input
      }
    }
    const updateProductSpy = new UpdateProductSpy()
    const sut = new UpdateProductController(updateProductSpy)
    const request = mockRequest()
    await sut.handle(request)
    expect(updateProductSpy.input).toEqual(request)
  })
})
