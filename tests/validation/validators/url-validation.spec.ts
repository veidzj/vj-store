import { faker } from '@faker-js/faker'
import { UrlValidatorSpy } from '@/tests/validation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { UrlValidation } from '@/validation/validators'
import { InvalidParamError } from '@/validation/errors'

const field: string = faker.word.words()

interface Sut {
  sut: UrlValidation
  urlValidatorSpy: UrlValidatorSpy
}

const makeSut = (): Sut => {
  const urlValidatorSpy = new UrlValidatorSpy()
  const sut = new UrlValidation(field, urlValidatorSpy)
  return {
    sut,
    urlValidatorSpy
  }
}

describe('UrlValidation', () => {
  test('Should call UrlValidator with correct urls', () => {
    const { sut, urlValidatorSpy } = makeSut()
    jest.spyOn(urlValidatorSpy, 'isValid')
    const urls = [faker.internet.url(), faker.internet.url()]
    sut.validate({ [field]: urls })
    expect(urlValidatorSpy.isValid).toHaveBeenCalledTimes(2)
    expect(urlValidatorSpy.isValid).toHaveBeenNthCalledWith(1, urls[0])
    expect(urlValidatorSpy.isValid).toHaveBeenLastCalledWith(urls[1])
  })

  test('Should throw InvalidParamError if any url is invalid', () => {
    const { sut, urlValidatorSpy } = makeSut()
    urlValidatorSpy.isUrlValid = false
    const error = (): void => {
      sut.validate({ [field]: [faker.internet.url(), faker.internet.url()] })
    }
    expect(error).toThrow(new InvalidParamError(field, 'must have valid urls'))
  })

  test('Should throw if UrlValidator throws', () => {
    const { sut, urlValidatorSpy } = makeSut()
    jest.spyOn(urlValidatorSpy, 'isValid').mockImplementationOnce(throwError)
    expect(sut.validate).toThrow()
  })
})
