import { faker } from '@faker-js/faker'
import { AddProductController } from '@/presentation/controllers/products/add-product-controller'
import { ValidationSpy } from '@/tests/presentation/mocks'

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
  test('Should call Validation with correct values', async() => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
})
