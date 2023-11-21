import { faker } from '@faker-js/faker'
import { InvalidParamError } from '@/validation/errors'
import { UrlValidation } from '@/validation/validators'
import { UrlValidatorAdapter } from '@/infra/validators'

const field: string = faker.word.words()

const makeSut = (): UrlValidation => {
  const urlValidator = new UrlValidatorAdapter()
  return new UrlValidation(field, urlValidator)
}

describe('UrlValidation', () => {
  test('Should throw InvalidParamError if any url is invalid', () => {
    const sut = makeSut()
    const error = (): void => {
      sut.validate({ [field]: [faker.word.words(), faker.internet.url()] })
    }
    expect(error).toThrow(new InvalidParamError(field, 'must have valid urls'))
  })
})
