import { throwError } from '@/tests/test-helper'
import { UpdateProductSpy } from '@/tests/presentation/mocks/product'
import { mockUpdateProductInput } from '@/tests/domain/mocks/product'
import { UpdateProductController } from '@/presentation/controllers/product'
import { HttpHelper } from '@/presentation/helpers'
import { ProductNotFoundError } from '@/domain/errors/product'

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

  test('Should return notFound if UpdateProduct throws ProductNotFoundError', async() => {
    const { sut, updateProductSpy } = makeSut()
    jest.spyOn(updateProductSpy, 'update').mockImplementationOnce(() => {
      throw new ProductNotFoundError()
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.notFound(new ProductNotFoundError()))
  })

  test('Should return serverError if UpdateProduct throws', async() => {
    const { sut, updateProductSpy } = makeSut()
    jest.spyOn(updateProductSpy, 'update').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.serverError(new Error()))
  })
})
