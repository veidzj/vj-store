import { faker } from '@faker-js/faker'
import { PositiveNumberValidation } from '@/validation/validators'
import { InvalidParamError } from '@/validation/errors'

const field: string = faker.word.words()

const makeSut = (): PositiveNumberValidation => {
  return new PositiveNumberValidation(field)
}

describe('PositiveNumberValidation', () => {
  test('Should throw InvalidParamError if value is less than 0', () => {
    const sut = makeSut()
    const error = (): void => {
      sut.validate({ [field]: -1 })
    }
    expect(error).toThrow(new InvalidParamError(field))
  })

  test('Should throw InvalidParamError if value is not a number', () => {
    const sut = makeSut()
    const error = (): void => {
      sut.validate({ [field]: 'not_number' })
    }
    expect(error).toThrow(new InvalidParamError(field))
  })
})
