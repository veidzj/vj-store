import { faker } from '@faker-js/faker'
import { ValidationSpy, AuthenticationSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { SignInController } from '@/presentation/controllers/auth'
import { HttpHelper } from '@/presentation/helpers'
import { ServerError } from '@/presentation/errors'
import { MissingParamError } from '@/validation/errors'
import { AuthenticationError } from '@/domain/errors'

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
  const httpHelper = new HttpHelper()

  describe('Validation', () => {
    test('Should call Validation with correct values', async() => {
      const { sut, validationSpy } = makeSut()
      const request = mockRequest()
      await sut.handle(request)
      expect(validationSpy.input).toEqual(request)
    })

    test('Should return Bad Request if Validation throws an error', async() => {
      const { sut, validationSpy } = makeSut()

      validationSpy.validate = jest.fn(() => {
        throw new MissingParamError('any_error')
      })

      const request = mockRequest()
      const httpResponse = await sut.handle(request)
      expect(httpResponse).toEqual(httpHelper.badRequest(new MissingParamError('any_error')))
    })
  })

  describe('Authentication', () => {
    test('Should call Authentication with correct values', async() => {
      const { sut, authenticationSpy } = makeSut()
      const request = mockRequest()
      await sut.handle(request)
      expect(authenticationSpy.input).toEqual(request)
    })

    test('Should return Server Error if Authentication throws', async() => {
      const { sut, authenticationSpy } = makeSut()
      jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(httpHelper.serverError(new ServerError(undefined)))
    })

    test('Should return Unauthorized if invalid credentials are provided', async() => {
      const { sut, authenticationSpy } = makeSut()
      authenticationSpy.output = null
      const request = mockRequest()
      const httpResponse = await sut.handle(request)
      expect(httpResponse).toEqual(httpHelper.unauthorized(new AuthenticationError('Invalid credentials')))
    })

    test('Should return Ok if valid credentials are provided', async() => {
      const { sut, authenticationSpy } = makeSut()
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(httpHelper.ok(authenticationSpy.output))
    })
  })
})
