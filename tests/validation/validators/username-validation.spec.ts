import { faker } from '@faker-js/faker'
import { UsernameValidation } from '@/validation/validators/username-validation'
import { UsernameValidatorSpy } from '@/tests/validation/mocks/mock-username-validator'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { throwError } from '@/tests/domain/mocks/test-helper'

interface Sut {
  sut: UsernameValidation
  nameValidatorSpy: UsernameValidatorSpy
}

const field = faker.internet.userName()

const makeSut = (): Sut => {
  const nameValidatorSpy = new UsernameValidatorSpy()
  const sut = new UsernameValidation(field, nameValidatorSpy)
  return {
    sut,
    nameValidatorSpy
  }
}

describe('UsernameValidation', () => {
  test('Should call UsernameValidator with correct username', () => {
    const { sut, nameValidatorSpy } = makeSut()
    const username = faker.person.firstName()
    sut.validate({ [field]: username })
    expect(nameValidatorSpy.username).toBe(username)
  })

  test('Should return InvalidParamError if validation returns false', () => {
    const { sut, nameValidatorSpy } = makeSut()
    nameValidatorSpy.isNameValid = false
    const username = faker.internet.userName()
    const error = sut.validate({ [field]: username })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should throw if UsernameValidator throws', () => {
    const { sut, nameValidatorSpy } = makeSut()
    jest.spyOn(nameValidatorSpy, 'isValid').mockImplementationOnce(throwError)
    expect(sut.validate).toThrow()
  })

  test('Should return null if UsernameValidator returns true', () => {
    const { sut } = makeSut()
    const username = faker.internet.userName()
    const error = sut.validate({ [field]: username })
    expect(error).toBeNull()
  })
})
