import { faker } from '@faker-js/faker'
import { CompareFieldsValidation } from '../../../src/validation/validators/compare-fields-validation'
import { InvalidParamError } from '../../../src/presentation/errors/invalid-param-error'

const field = faker.word.words()
const fieldToCompare = faker.word.words()

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation(field, fieldToCompare)
}

describe('CompareFieldsValidation', () => {
  test('Should return InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      [field]: faker.word.words(),
      [fieldToCompare]: faker.word.words()
    })
    expect(error).toEqual(new InvalidParamError(fieldToCompare))
  })

  test('Should return null if validation succeeds', () => {
    const sut = makeSut()
    const value = faker.word.words()
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value
    })
    expect(error).toBeNull()
  })
})
