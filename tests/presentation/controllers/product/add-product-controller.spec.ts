import MockDate from 'mockdate'
import { faker } from '@faker-js/faker'

import { ValidationSpy, AddProductSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { AddProductController } from '@/presentation/controllers/product'
import { HttpHelper } from '@/presentation/helpers'
import { ServerError } from '@/presentation/errors'
import { CategoryError, ValidationError } from '@/domain/errors'

interface Sut {
  sut: AddProductController
  validationSpy: ValidationSpy
  addProductSpy: AddProductSpy
}

const makeSut = (): Sut => {
  const validationSpy = new ValidationSpy()
  const addProductSpy = new AddProductSpy()
  const sut = new AddProductController(validationSpy, addProductSpy)
  return {
    sut,
    validationSpy,
    addProductSpy
  }
}

const mockRequest = (): AddProductController.Request => ({
  name: faker.word.words(),
  description: faker.word.words(),
  price: faker.number.int(1000),
  discountPercentage: faker.number.int({ min: 0, max: 100 }),
  category: faker.word.words(),
  imageUrls: [faker.internet.url(), faker.internet.url()],
  quantity: faker.number.int(100)
})

describe('AddProductController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

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

  describe('AddProduct', () => {
    test('Should call AddProduct with correct values', async() => {
      const { sut, addProductSpy } = makeSut()
      const request = mockRequest()
      await sut.handle(request)
      expect(addProductSpy.input).toEqual({ ...request, addedAt: new Date() })
    })

    test('Should return badRequest if AddProduct throws CategoryError', async() => {
      const { sut, addProductSpy } = makeSut()
      const errorMessage = faker.word.words()
      jest.spyOn(addProductSpy, 'add').mockImplementationOnce(() => { throw new CategoryError(errorMessage) })
      const response = await sut.handle(mockRequest())
      expect(response).toEqual(HttpHelper.badRequest(new CategoryError(errorMessage)))
    })

    test('Should return serverError if AddProduct throws', async() => {
      const { sut, addProductSpy } = makeSut()
      jest.spyOn(addProductSpy, 'add').mockImplementationOnce(throwError)
      const response = await sut.handle(mockRequest())
      expect(response).toEqual(HttpHelper.serverError(new ServerError(undefined)))
    })

    test('Should return ok on success', async() => {
      const { sut } = makeSut()
      const response = await sut.handle(mockRequest())
      expect(response).toEqual(HttpHelper.ok({ message: 'Product successfully added' }))
    })
  })
})
