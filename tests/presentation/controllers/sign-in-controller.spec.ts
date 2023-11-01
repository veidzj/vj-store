import { faker } from '@faker-js/faker'
import { SignInController } from '@/presentation/controllers/sign-in-controller'
import { ValidationSpy } from '@/tests/presentation/mocks/mock-validation'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequest } from '@/presentation/helpers/http-helper'

interface Sut {
  sut: SignInController
  validationSpy: ValidationSpy
}

const makeSut = (): Sut => {
  const validationSpy = new ValidationSpy()
  const sut = new SignInController(validationSpy)
  return {
    sut,
    validationSpy
  }
}

const mockRequest = (): any => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

describe('SignInController', () => {
  describe('Validation', () => {
    test('Should call Validation with correct values', async() => {
      const { sut, validationSpy } = makeSut()
      const request = mockRequest()
      await sut.handle(request)
      expect(validationSpy.input).toEqual(request)
    })

    test('Should return Bad Request if Validation returns an error', async() => {
      const { sut, validationSpy } = makeSut()
      validationSpy.error = new MissingParamError(faker.word.words())
      const request = mockRequest()
      const httpResponse = await sut.handle(request)
      expect(httpResponse).toEqual(badRequest(validationSpy.error))
    })
  })
})
