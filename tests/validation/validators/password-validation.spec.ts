import { faker } from '@faker-js/faker'
import { PasswordValidation } from '@/validation/validators/password-validation'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'

const field = faker.internet.password()

const makeSut = (): PasswordValidation => {
  return new PasswordValidation(field)
}

describe('PasswordValidation', () => {
  test('Should return InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate(faker.internet.password({ length: 5 }))
    expect(error).toEqual(new InvalidParamError(field, 'must be at least 6 characters long'))
  })
})
