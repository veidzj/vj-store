import { faker } from '@faker-js/faker'
import { EmailValidation } from '../../../src/validation/validators/email-validation'
import { EmailValidatorSpy } from '../mocks/mock-email-validator'
import { InvalidParamError } from '../../../src/presentation/errors/invalid-param-error'
import { throwError } from '../../domain/mocks/test-helper'

interface Sut {
  sut: EmailValidation
  emailValidatorSpy: EmailValidatorSpy
}

const field = faker.word.words()

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

  test('Should return InvalidParamError if EmailValidator returns false', () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.isEmailValid = false
    const email = faker.internet.email()
    const error = sut.validate({ [field]: email })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should throw if EmailValidator throws', () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest.spyOn(emailValidatorSpy, 'isValid').mockImplementationOnce(throwError)
    expect(sut.validate).toThrow()
  })
})
