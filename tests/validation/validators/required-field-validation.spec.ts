import { faker } from '@faker-js/faker'
import { RequiredFieldValidation } from '../../../src/validation/validators/required-field-validation'
import { MissingParamError } from '../../../src/presentation/errors/missing-param-error'

const field = faker.word.words()

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation(field)
}

describe('RequiredFieldValidation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ invalidField: faker.word.words() })
    expect(error).toEqual(new MissingParamError(field))
  })
})
