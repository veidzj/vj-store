import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { AddProductSpy } from '@/tests/presentation/mocks/product'
import { mockAddProductInput } from '@/tests/domain/mocks/product'
import { AddProductController } from '@/presentation/controllers/product'
import { HttpHelper } from '@/presentation/helpers'
import { EntityValidationError } from '@/domain/errors'

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

  test('Should return badRequest if AddProduct throws EntityValidationError', async() => {
    const { sut, addProductSpy } = makeSut()
    const errorMessage = faker.word.words()
    jest.spyOn(addProductSpy, 'add').mockImplementationOnce(() => {
      throw new EntityValidationError(errorMessage)
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.badRequest(new EntityValidationError(errorMessage)))
  })

  test('Should return serverError if AddProduct throws', async() => {
    const { sut, addProductSpy } = makeSut()
    jest.spyOn(addProductSpy, 'add').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.serverError(new Error()))
  })
})
