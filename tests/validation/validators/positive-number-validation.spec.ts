import { faker } from '@faker-js/faker'
import { PositiveNumberValidation } from '@/validation/validators'
import { InvalidParamError } from '@/validation/errors'

const field: string = faker.word.words()

const makeSut = (): PositiveNumberValidation => {
  return new PositiveNumberValidation(field)
}

describe('PositiveNumberValidation', () => {
  test('Should throw InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = (): void => {
      sut.validate({ [field]: -1 })
    }
    expect(error).toThrow(new InvalidParamError(field))
  })
})
