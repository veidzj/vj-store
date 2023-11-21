import { faker } from '@faker-js/faker'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { AddCategoryController } from '@/presentation/controllers/category'

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
  describe('Validation', () => {
    test('Should call Validation with correct values', async() => {
      const { sut, validationSpy } = makeSut()
      const request = mockRequest()
      await sut.handle(request)
      expect(validationSpy.input).toEqual(request)
    })
  })
})
