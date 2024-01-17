import { UpdateProductSpy } from '@/tests/presentation/mocks/product'
import { mockUpdateProductInput } from '@/tests/domain/mocks/product'
import { UpdateProductController } from '@/presentation/controllers/product'

interface Sut {
  sut: UpdateProductController
  updateProductSpy: UpdateProductSpy
}

const makeSut = (): Sut => {
  const updateProductSpy = new UpdateProductSpy()
  const sut = new UpdateProductController(updateProductSpy)
  return {
    sut,
    updateProductSpy
  }
}

const mockRequest = (): UpdateProductController.Request => mockUpdateProductInput()

describe('UpdateProductController', () => {
  test('Should call UpdateProduct with correct values', async() => {
    const { sut, updateProductSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(updateProductSpy.input).toEqual(request)
  })
})
