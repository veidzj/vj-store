import { faker } from '@faker-js/faker'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { MissingParamError } from '@/presentation/errors/missing-param-error'

const field = faker.word.words()

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation(field)
}

describe('RequiredFieldValidation', () => {
  test('Should return MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ invalidField: faker.word.words() })
    expect(error).toEqual(new MissingParamError(field))
  })

  test('Should return null if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ [field]: faker.word.words() })
    expect(error).toBeNull()
  })
})
