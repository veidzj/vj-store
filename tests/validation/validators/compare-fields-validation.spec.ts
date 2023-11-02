import { faker } from '@faker-js/faker'
import { CompareFieldsValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'

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
    expect(error).toEqual(new InvalidParamError(fieldToCompare, `needs to be equal to ${field}`))
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
