import { faker } from '@faker-js/faker'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { AddProductController } from '@/presentation/controllers/product/add-product-controller'
import { HttpHelper } from '@/presentation/helpers'
import { ValidationError } from '@/domain/errors'

interface Sut {
  sut: AddProductController
  validationSpy: ValidationSpy
}

const makeSut = (): Sut => {
  const validationSpy = new ValidationSpy()
  const sut = new AddProductController(validationSpy)
  return {
    sut,
    validationSpy
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
