import { faker } from '@faker-js/faker'
import { CompareFieldsValidation } from '../../../src/validation/validators/compare-fields-validation'
import { InvalidParamError } from '../../../src/presentation/errors/invalid-param-error'

const field = faker.word.words()
const fieldToCompare = faker.word.words()

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation(field, fieldToCompare)
}

describe('CompareFieldsValidation', () => {
  test('Should return an InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      [field]: faker.word.words(),
      [fieldToCompare]: faker.word.words()
    })
    expect(error).toEqual(new InvalidParamError(fieldToCompare))
  })
})
