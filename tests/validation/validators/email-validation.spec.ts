import { faker } from '@faker-js/faker'
import { EmailValidatorSpy } from '@/tests/validation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { EmailValidation } from '@/validation/validators/auth'
import { InvalidParamError } from '@/validation/errors'

const field: string = faker.word.words()

interface Sut {
  sut: EmailValidation
  emailValidatorSpy: EmailValidatorSpy
}

const makeSut = (): Sut => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const sut = new EmailValidation(field, emailValidatorSpy)
  return {
    sut,
    emailValidatorSpy
  }
}

describe('EmailValidation', () => {
  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorSpy } = makeSut()
    const email = faker.internet.email()
    sut.validate({ [field]: email })
    expect(emailValidatorSpy.email).toBe(email)
  })

  test('Should throw InvalidParamError if EmailValidator returns false', () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.isEmailValid = false
    const email = faker.internet.email()
    const error = (): void => {
      sut.validate({ [field]: email })
    }
    expect(error).toThrow(new InvalidParamError(field))
  })

  test('Should throw if EmailValidator throws', () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest.spyOn(emailValidatorSpy, 'isValid').mockImplementationOnce(throwError)
    expect(sut.validate).toThrow()
  })
})
