import { faker } from '@faker-js/faker'

import { DiscountValidation } from '@/validation/validators/product'
import { InvalidParamError } from '@/validation/errors'

const field: string = faker.word.words()

const makeSut = (): DiscountValidation => {
  return new DiscountValidation(field)
}

describe('DiscountValidation', () => {
  test('Should throw InvalidParamError if discount is not a number', () => {
    const sut = makeSut()
    const error = (): void => {
      sut.validate({ [field]: faker.word.words() })
    }
    expect(error).toThrow(new InvalidParamError(field, 'needs to be between 0 and 100'))
  })

  test('Should throw InvalidParamError if discount is less than 0', () => {
    const sut = makeSut()
    const error = (): void => {
      sut.validate({ [field]: faker.number.int() * -1 })
    }
    expect(error).toThrow(new InvalidParamError(field, 'needs to be between 0 and 100'))
  })

  test('Should throw InvalidParamError if discount is greater than 100', () => {
    const sut = makeSut()
    const error = (): void => {
      sut.validate({ [field]: faker.number.int({ min: 100 }) })
    }
    expect(error).toThrow(new InvalidParamError(field, 'needs to be between 0 and 100'))
  })

  test('Should not throw if validation succeeds', () => {
    const sut = makeSut()
    const error = (): void => {
      sut.validate({ [field]: faker.number.int({ min: 0, max: 100 }) })
    }
    expect(error).not.toThrow()
  })
})
