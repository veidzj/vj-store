import { faker } from '@faker-js/faker'
import { NameValidation } from '@/validation/validators/name-validation'
import { NameValidatorSpy } from '@/tests/validation/mocks/mock-name-validator'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { throwError } from '@/tests/domain/mocks/test-helper'

interface Sut {
  sut: NameValidation
  nameValidatorSpy: NameValidatorSpy
}

const field = faker.internet.userName()

const makeSut = (): Sut => {
  const nameValidatorSpy = new NameValidatorSpy()
  const sut = new NameValidation(field, nameValidatorSpy)
  return {
    sut,
    nameValidatorSpy
  }
}

describe('NameValidation', () => {
  test('Should call NameValidator with correct name', () => {
    const { sut, nameValidatorSpy } = makeSut()
    const name = faker.internet.userName()
    sut.validate({ [field]: name })
    expect(nameValidatorSpy.name).toBe(name)
  })

  test('Should return InvalidParamError if validation returns false', () => {
    const { sut, nameValidatorSpy } = makeSut()
    nameValidatorSpy.isNameValid = false
    const name = faker.internet.userName()
    const error = sut.validate({ [field]: name })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should throw if NameValidator throws', () => {
    const { sut, nameValidatorSpy } = makeSut()
    jest.spyOn(nameValidatorSpy, 'isValid').mockImplementationOnce(throwError)
    expect(sut.validate).toThrow()
  })

  test('Should return null if NameValidator returns true', () => {
    const { sut } = makeSut()
    const name = faker.internet.userName()
    const error = sut.validate({ [field]: name })
    expect(error).toBeNull()
  })
})
