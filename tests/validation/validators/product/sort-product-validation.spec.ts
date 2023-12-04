import { faker } from '@faker-js/faker'

import { SortProductValidation } from '@/validation/validators/product'
import { InvalidParamError } from '@/validation/errors'

const field: string = faker.word.words()

const makeSut = (): SortProductValidation => {
  return new SortProductValidation(field)
}

describe('SortProductValidation', () => {
  test('Should throw InvalidParamError if values is invalid', () => {
    const sut = makeSut()
    const error = (): void => {
      sut.validate({ [field]: faker.word.words() })
    }
    expect(error).toThrow(new InvalidParamError(field))
  })

  test('Should not throw if value is `latest`', () => {
    const sut = makeSut()
    const error = (): void => {
      sut.validate({ [field]: 'latest' })
    }
    expect(error).not.toThrow()
  })
})
