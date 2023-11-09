import { faker } from '@faker-js/faker'
import { PasswordValidation } from '@/validation/validators'
import { InvalidParamError } from '@/validation/errors'

const field = faker.word.words()

const makeSut = (): PasswordValidation => {
  return new PasswordValidation(field)
}

describe('PasswordValidation', () => {
  test('Should throw InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const password = faker.internet.password({ length: 5 })
    const error = (): void => {
      sut.validate({ [field]: password })
    }
    expect(error).toThrow(new InvalidParamError(field, 'must be at least 6 characters long'))
  })

  test('Should not throw if validation succeeds', () => {
    const sut = makeSut()
    const password = faker.internet.password()
    const error = (): void => {
      sut.validate({ [field]: password })
    }
    expect(error).not.toThrow()
  })
})
