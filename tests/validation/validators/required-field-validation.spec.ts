import { faker } from '@faker-js/faker'
import { RequiredFieldValidation } from '@/validation/validators'
import { MissingParamError } from '@/validation/errors'

const field: string = faker.word.words()

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation(field)
}

describe('RequiredFieldValidation', () => {
  test('Should throw MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = (): void => {
      sut.validate({ invalidField: faker.word.words() })
    }
    expect(error).toThrow(new MissingParamError(field))
  })

  test('Should throw MissingParamError if empty array is provided', () => {
    const sut = makeSut()
    const error = (): void => {
      sut.validate({ [field]: [] })
    }
    expect(error).toThrow(new MissingParamError(field))
  })

  test('Should not throw if validation succeeds', () => {
    const sut = makeSut()
    const error = (): void => {
      sut.validate({ [field]: faker.word.words() })
    }
    expect(error).not.toThrow()
  })
})
