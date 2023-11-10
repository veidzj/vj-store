import { faker } from '@faker-js/faker'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { ValidationComposite } from '@/validation/validators'
import { InvalidParamError, MissingParamError } from '@/validation/errors'

const field = faker.word.words()

interface Sut {
  sut: ValidationComposite
  validationSpies: ValidationSpy[]
}

const makeSut = (): Sut => {
  const validationSpies = [
    new ValidationSpy(),
    new ValidationSpy()
  ]
  const sut = new ValidationComposite(validationSpies)
  return {
    sut,
    validationSpies
  }
}

describe('ValidationComposite', () => {
  test('Should throw an error if any validation fails', () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[1].hasError = true
    const error = (): void => {
      sut.validate({ [field]: faker.word.words() })
    }
    expect(error).toThrow(validationSpies[1].error)
  })

  test('Should thow the first error if more than one validation fails', () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[0].hasError = true
    validationSpies[0].error = new MissingParamError(field)
    validationSpies[1].hasError = true
    validationSpies[1].error = new InvalidParamError(field)
    const error = (): void => {
      sut.validate({ [field]: faker.word.words() })
    }
    expect(error).toThrow(validationSpies[0].error)
  })

  test('Should not throw if validation succeeds', () => {
    const { sut } = makeSut()
    const error = (): void => {
      sut.validate({ [field]: faker.word.words() })
    }
    expect(error).not.toThrow()
  })
})
