import { faker } from '@faker-js/faker'

import { SortProductValidation } from '@/validation/validators/product'
import { InvalidParamError } from '@/validation/errors'

const field: string = faker.word.words()

const makeSut = (): SortProductValidation => {
  return new SortProductValidation(field)
}

describe('SortProductValidation', () => {
  test('Should throw InvalidParamError if value is invalid', () => {
    const sut = makeSut()
    const error = (): void => {
      sut.validate({ [field]: faker.word.words() })
    }
    expect(error).toThrow(new InvalidParamError(field))
  })

  test('Should not throw if value is empty', () => {
    const sut = makeSut()
    const error = (): void => {
      sut.validate({ [field]: '' })
    }
    expect(error).not.toThrow()
  })

  test('Should not throw if value is `latest`', () => {
    const sut = makeSut()
    const error = (): void => {
      sut.validate({ [field]: 'latest' })
    }
    expect(error).not.toThrow()
  })

  test('Should not throw if value is `discount`', () => {
    const sut = makeSut()
    const error = (): void => {
      sut.validate({ [field]: 'discount' })
    }
    expect(error).not.toThrow()
  })
})
