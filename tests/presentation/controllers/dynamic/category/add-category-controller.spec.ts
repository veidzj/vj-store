import MockDate from 'mockdate'
import { faker } from '@faker-js/faker'

import { AddCategorySpy, ValidationSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { AddCategoryController } from '@/presentation/controllers/dynamic/category'
import { HttpHelper } from '@/presentation/helpers'
import { ServerError } from '@/presentation/errors'
import { ValidationError } from '@/domain/errors'

interface Sut {
  sut: AddCategoryController
  validationSpy: ValidationSpy
  addCategorySpy: AddCategorySpy
}

const makeSut = (): Sut => {
  const validationSpy = new ValidationSpy()
  const addCategorySpy = new AddCategorySpy()
  const sut = new AddCategoryController(validationSpy, addCategorySpy)
  return {
    sut,
    validationSpy,
    addCategorySpy
  }
}

const mockRequest = (): AddCategoryController.Request => ({
  name: faker.word.words()
})

describe('AddCategoryController', () => {
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

  describe('AddCategory', () => {
    test('Should call AddCategory with correct values', async() => {
      const { sut, addCategorySpy } = makeSut()
      const request = mockRequest()
      await sut.handle(request)
      expect(addCategorySpy.input).toEqual({ ...request, addedAt: new Date() })
    })

    test('Should return serverError if AddCategory throws', async() => {
      const { sut, addCategorySpy } = makeSut()
      jest.spyOn(addCategorySpy, 'add').mockImplementationOnce(throwError)
      const response = await sut.handle(mockRequest())
      expect(response).toEqual(HttpHelper.serverError(new ServerError(undefined)))
    })

    test('Should return ok on success', async() => {
      const { sut } = makeSut()
      const response = await sut.handle(mockRequest())
      expect(response).toEqual(HttpHelper.ok({ message: 'Category successfully added' }))
    })
  })
})