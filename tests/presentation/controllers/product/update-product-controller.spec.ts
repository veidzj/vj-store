import { faker } from '@faker-js/faker'
import { UpdateProductSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { UpdateProductController } from '@/presentation/controllers/product'
import { ValidationError } from '@/domain/errors'
import { HttpHelper } from '@/presentation/helpers'

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

const mockRequest = (): UpdateProductController.Request => ({
  productId: faker.string.uuid(),
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

    test('Should return Bad Request if Validation throws an error', async() => {
      const { sut, validationSpy } = makeSut()
      const errorMessage = faker.word.words()
      validationSpy.validate = jest.fn(() => {
        throw new ValidationError(errorMessage)
      })
      const request = mockRequest()
      const httpResponse = await sut.handle(request)
      expect(httpResponse).toEqual(HttpHelper.badRequest(new ValidationError(errorMessage)))
    })
  })

  describe('UpdateProduct', () => {
    test('Should call UpdateProduct with correct values', async() => {
      const { sut, updateProductSpy } = makeSut()
      const request = mockRequest()
      await sut.handle(request)
      expect(updateProductSpy.input).toEqual(request)
    })
  })
})
