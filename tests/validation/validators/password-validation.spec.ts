import { faker } from '@faker-js/faker'
import { PasswordValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'

const field = faker.word.words()

const makeSut = (): PasswordValidation => {
  return new PasswordValidation(field)
}

describe('PasswordValidation', () => {
  test('Should return InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const password = faker.internet.password({ length: 5 })
    const error = sut.validate({ [field]: password })
    expect(error).toEqual(new InvalidParamError(field, 'must be at least 6 characters long'))
  })

  test('Should return null if validation succeeds', () => {
    const sut = makeSut()
    const password = faker.internet.password()
    const error = sut.validate({ [field]: password })
    expect(error).toBeNull()
  })
})
