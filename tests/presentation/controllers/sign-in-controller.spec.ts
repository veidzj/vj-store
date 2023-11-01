import { faker } from '@faker-js/faker'
import { SignInController } from '@/presentation/controllers/sign-in-controller'
import { ValidationSpy } from '@/tests/presentation/mocks/mock-validation'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequest, unauthorized } from '@/presentation/helpers/http-helper'
import { AuthenticationSpy } from '@/tests/presentation/mocks/mock-account'

interface Sut {
  sut: SignInController
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): Sut => {
  const validationSpy = new ValidationSpy()
  const authenticationSpy = new AuthenticationSpy()
  const sut = new SignInController(validationSpy, authenticationSpy)
  return {
    sut,
    validationSpy,
    authenticationSpy
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

  describe('Authentication', () => {
    test('Should call Authentication with correct values', async() => {
      const { sut, authenticationSpy } = makeSut()
      const request = mockRequest()
      await sut.handle(request)
      expect(authenticationSpy.input).toEqual(request)
    })

    test('Should return Unauthorized if invalid credentials are provided', async() => {
      const { sut, authenticationSpy } = makeSut()
      authenticationSpy.output = null
      const request = mockRequest()
      const httpResponse = await sut.handle(request)
      expect(httpResponse).toEqual(unauthorized())
    })
  })
})
