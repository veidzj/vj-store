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
})
