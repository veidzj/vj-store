import { faker } from '@faker-js/faker'

import { UsernameValidatorSpy } from '@/tests/validation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { UsernameValidation } from '@/validation/validators/auth'
import { InvalidParamError } from '@/validation/errors'

const field: string = faker.internet.userName()

interface Sut {
  sut: UsernameValidation
  nameValidatorSpy: UsernameValidatorSpy
}

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

  test('Should throw InvalidParamError if UsernameValidator returns false', () => {
    const { sut, nameValidatorSpy } = makeSut()
    nameValidatorSpy.isNameValid = false
    const error = (): void => {
      sut.validate({ [field]: faker.internet.userName() })
    }
    expect(error).toThrow(new InvalidParamError(field, 'must include only letters and a maximum of 12 characters'))
  })

  test('Should throw if UsernameValidator throws', () => {
    const { sut, nameValidatorSpy } = makeSut()
    jest.spyOn(nameValidatorSpy, 'isValid').mockImplementationOnce(throwError)
    expect(sut.validate).toThrow()
  })

  test('Should not throw if UsernameValidator returns true', () => {
    const { sut } = makeSut()
    const error = (): void => {
      sut.validate({ [field]: faker.internet.userName() })
    }
    expect(error).not.toThrow()
  })
})
