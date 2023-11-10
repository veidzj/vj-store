import { faker } from '@faker-js/faker'
import { CompareFieldsValidation } from '@/validation/validators'
import { InvalidParamError } from '@/validation/errors'

const field = faker.word.words()
const fieldToCompare = faker.word.words()

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation(field, fieldToCompare)
}

describe('CompareFieldsValidation', () => {
  test('Should throw InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = (): void => {
      sut.validate({
        [field]: faker.word.words(),
        [fieldToCompare]: faker.word.words()
      })
    }
    expect(error).toThrow(new InvalidParamError(fieldToCompare, `needs to be equal to ${field}`))
  })

  test('Should not throw if validation succeeds', () => {
    const sut = makeSut()
    const value = faker.word.words()
    const error = (): void => {
      sut.validate({
        [field]: value,
        [fieldToCompare]: value
      })
    }
    expect(error).not.toThrow()
  })
})
