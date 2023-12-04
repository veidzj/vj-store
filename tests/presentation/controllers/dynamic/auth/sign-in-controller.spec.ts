import { faker } from '@faker-js/faker'

import { ValidationSpy, AuthenticationSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { SignInController } from '@/presentation/controllers/dynamic/auth'
import { HttpHelper } from '@/presentation/helpers'
import { ServerError } from '@/presentation/errors'
import { AuthenticationError, ValidationError } from '@/domain/errors'

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

const mockRequest = (): SignInController.Request => ({
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

    test('Should return badRequest if Validation throws an error', async() => {
      const { sut, validationSpy } = makeSut()
      const errorMessage = faker.word.words()
      validationSpy.validate = jest.fn(() => {
        throw new ValidationError(errorMessage)
      })
      const request = mockRequest()
      const response = await sut.handle(request)
      expect(response).toEqual(HttpHelper.badRequest(new ValidationError(errorMessage)))
    })
  })

  describe('Authentication', () => {
    test('Should call Authentication with correct values', async() => {
      const { sut, authenticationSpy } = makeSut()
      const request = mockRequest()
      await sut.handle(request)
      expect(authenticationSpy.input).toEqual(request)
    })

    test('Should return serverError if Authentication throws', async() => {
      const { sut, authenticationSpy } = makeSut()
      jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)
      const response = await sut.handle(mockRequest())
      expect(response).toEqual(HttpHelper.serverError(new ServerError(undefined)))
    })

    test('Should return unauthorized if invalid credentials are provided', async() => {
      const { sut, authenticationSpy } = makeSut()
      const errorMessage = faker.word.words()
      jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(() => { throw new AuthenticationError(errorMessage) })
      const request = mockRequest()
      const response = await sut.handle(request)
      expect(response).toEqual(HttpHelper.unauthorized(new AuthenticationError(errorMessage)))
    })

    test('Should return ok on success', async() => {
      const { sut, authenticationSpy } = makeSut()
      const response = await sut.handle(mockRequest())
      expect(response).toEqual(HttpHelper.ok(authenticationSpy.account))
    })
  })
})