import { faker } from '@faker-js/faker'
import { ValidationSpy } from '@/tests/presentation/mocks/mock-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'
import { MissingParamError } from '@/presentation/errors/missing-param-error'

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
})
