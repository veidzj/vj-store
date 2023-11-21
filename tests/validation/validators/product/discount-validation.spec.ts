import { faker } from '@faker-js/faker'
import { DiscountValidation } from '@/validation/validators/product'
import { InvalidParamError } from '@/validation/errors'

const field: string = faker.word.words()

const makeSut = (): DiscountValidation => {
  return new DiscountValidation(field)
}

describe('DiscountValidation', () => {
  test('Should throw InvalidParamError if discount is less than 0', () => {
    const sut = makeSut()
    const error = (): void => {
      sut.validate({ [field]: faker.number.int() * -1 })
    }
    expect(error).toThrow(new InvalidParamError(field, 'needs to be between 0 and 100'))
  })
})
