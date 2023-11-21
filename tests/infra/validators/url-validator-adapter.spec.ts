import validator from 'validator'
import { faker } from '@faker-js/faker'
import { UrlValidatorAdapter } from '@/infra/validators'

jest.mock('validator', () => ({
  isURL(): boolean {
    return true
  }
}))

const makeSut = (): UrlValidatorAdapter => {
  return new UrlValidatorAdapter()
}

describe('UrlValidatorAdapter', () => {
  test('Should call validator with correct url', () => {
    const sut = makeSut()
    const isUrlSpy = jest.spyOn(validator, 'isURL')
    const url = faker.internet.url()
    sut.isValid(url)
    expect(isUrlSpy).toHaveBeenCalledWith(url)
  })

  test('Should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isURL').mockReturnValueOnce(false)
    const isValid = sut.isValid(faker.internet.url())
    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid(faker.internet.url())
    expect(isValid).toBe(true)
  })
})
