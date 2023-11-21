import { faker } from '@faker-js/faker'
import { AddCategorySpy, ValidationSpy } from '@/tests/presentation/mocks'
import { AddCategoryController } from '@/presentation/controllers/category'
import { ValidationError } from '@/domain/errors'
import { HttpHelper } from '@/presentation/helpers'

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
  const httpHelper = new HttpHelper()

  describe('Validation', () => {
    test('Should call Validation with correct values', async() => {
      const { sut, validationSpy } = makeSut()
      const request = mockRequest()
      await sut.handle(request)
      expect(validationSpy.input).toEqual(request)
    })

    test('Should return Bad Request if Validation throws an error', async() => {
      const { sut, validationSpy } = makeSut()
      const errorMessage = faker.word.words()
      validationSpy.validate = jest.fn(() => {
        throw new ValidationError(errorMessage)
      })
      const request = mockRequest()
      const httpResponse = await sut.handle(request)
      expect(httpResponse).toEqual(httpHelper.badRequest(new ValidationError(errorMessage)))
    })
  })

  describe('AddCategory', () => {
    test('Should call AddCategory with correct values', async() => {
      const { sut, addCategorySpy } = makeSut()
      const request = mockRequest()
      await sut.handle(request)
      expect(addCategorySpy.input).toEqual(request)
    })
  })
})
