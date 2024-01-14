import { AddProductSpy } from '@/tests/presentation/mocks/product'
import { mockAddProductInput } from '@/tests/domain/mocks/product'
import { AddProductController } from '@/presentation/controllers/product'

interface Sut {
  sut: AddProductController
  addProductSpy: AddProductSpy
}

const makeSut = (): Sut => {
  const addProductSpy = new AddProductSpy()
  const sut = new AddProductController(addProductSpy)
  return {
    sut,
    addProductSpy
  }
}

const mockRequest = (): AddProductController.Request => mockAddProductInput()

describe('AddProductController', () => {
  test('Should call AddProduct with correct values', async() => {
    const { sut, addProductSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addProductSpy.input).toEqual(request)
  })
})
