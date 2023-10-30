import { faker } from '@faker-js/faker'
import { NameValidation } from '@/validation/validators/name-validation'
import { NameValidatorSpy } from '@/tests/validation/mocks/mock-name-validator'

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
})
