import { faker } from '@faker-js/faker'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { ValidationComposite } from '@/validation/validators'
import { MissingParamError } from '@/presentation/errors'

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
  test('Should return an error if any validation fails', () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[1].error = new MissingParamError(field)
    const error = sut.validate({ [field]: faker.word.words() })
    expect(error).toEqual(validationSpies[1].error)
  })

  test('Should return the first error if more than one validation fails', () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[0].error = new Error()
    validationSpies[1].error = new MissingParamError(field)
    const error = sut.validate({ [field]: faker.word.words() })
    expect(error).toEqual(validationSpies[0].error)
  })

  test('Should return null if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ [field]: faker.word.words() })
    expect(error).toBeNull()
  })
})
