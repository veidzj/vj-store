import { faker } from '@faker-js/faker'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { AddCategoryController } from '@/presentation/controllers/category'
import { ValidationError } from '@/domain/errors'
import { HttpHelper } from '@/presentation/helpers'

interface Sut {
  sut: AddCategoryController
  validationSpy: ValidationSpy
}

const makeSut = (): Sut => {
  const validationSpy = new ValidationSpy()
  const sut = new AddCategoryController(validationSpy)
  return {
    sut,
    validationSpy
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
})
