import { faker } from '@faker-js/faker'

import { UpdateProductSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { UpdateProductController } from '@/presentation/controllers/product'
import { type UpdateProductControllerRequest } from '@/presentation/protocols/product'
import { HttpHelper } from '@/presentation/helpers'
import { ServerError } from '@/presentation/errors'
import { ProductError, ValidationError } from '@/domain/errors'

interface Sut {
  sut: UpdateProductController
  validationSpy: ValidationSpy
  updateProductSpy: UpdateProductSpy
}

const makeSut = (): Sut => {
  const validationSpy = new ValidationSpy()
  const updateProductSpy = new UpdateProductSpy()
  const sut = new UpdateProductController(validationSpy, updateProductSpy)
  return {
    sut,
    validationSpy,
    updateProductSpy
  }
}

const mockRequest = (): UpdateProductControllerRequest => ({
  id: faker.string.uuid(),
  name: faker.word.words(),
  description: faker.word.words(),
  price: faker.number.int(1000),
  discountPercentage: faker.number.int({ min: 0, max: 100 }),
  category: faker.word.words(),
  imageUrls: [faker.internet.url(), faker.internet.url()],
  quantity: faker.number.int(100)
})

describe('UpdateProductController', () => {
  describe('Validation', () => {
    test('Should call Validation with correct values', async() => {
      const { sut, validationSpy } = makeSut()
      const request = mockRequest()
      await sut.handle(request)
      expect(validationSpy.input).toEqual(request)
    })

    test('Should return badRequest if Validation throws an error', async() => {
      const { sut, validationSpy } = makeSut()
      const errorMessage = faker.word.words()
      validationSpy.validate = jest.fn(() => {
        throw new ValidationError(errorMessage)
      })
      const request = mockRequest()
      const response = await sut.handle(request)
      expect(response).toEqual(HttpHelper.badRequest(new ValidationError(errorMessage)))
    })
  })

  describe('UpdateProduct', () => {
    test('Should call UpdateProduct with correct values', async() => {
      const { sut, updateProductSpy } = makeSut()
      const request = mockRequest()
      await sut.handle(request)
      expect(updateProductSpy.input).toEqual(request)
    })

    test('Should return badRequest if UpdateProduct throws a ProductError', async() => {
      const { sut, updateProductSpy } = makeSut()
      const errorMessage = faker.word.words()
      jest.spyOn(updateProductSpy, 'update').mockImplementationOnce(() => { throw new ProductError(errorMessage) })
      const response = await sut.handle(mockRequest())
      expect(response).toEqual(HttpHelper.badRequest(new ProductError(errorMessage)))
    })

    test('Should return serverError if UpdateProduct throws', async() => {
      const { sut, updateProductSpy } = makeSut()
      jest.spyOn(updateProductSpy, 'update').mockImplementationOnce(throwError)
      const response = await sut.handle(mockRequest())
      expect(response).toEqual(HttpHelper.serverError(new ServerError(undefined)))
    })

    test('Should return ok on success', async() => {
      const { sut } = makeSut()
      const response = await sut.handle(mockRequest())
      expect(response).toEqual(HttpHelper.ok({ message: 'Product successfully updated' }))
    })
  })
})
