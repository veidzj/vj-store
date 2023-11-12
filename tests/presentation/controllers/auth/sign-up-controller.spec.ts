import { faker } from '@faker-js/faker'
import { ValidationSpy, AddAccountSpy, AuthenticationSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { SignUpController } from '@/presentation/controllers/auth'
import { HttpHelper } from '@/presentation/helpers'
import { ServerError } from '@/presentation/errors'
import { MissingParamError } from '@/validation/errors'
import { AuthenticationError } from '@/domain/errors'
import { EmailInUseError } from '@/application/errors/auth'

interface Sut {
  sut: SignUpController
  validationSpy: ValidationSpy
  addAccountSpy: AddAccountSpy
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): Sut => {
  const validationSpy = new ValidationSpy()
  const addAccountSpy = new AddAccountSpy()
  const authenticationSpy = new AuthenticationSpy()
  const sut = new SignUpController(validationSpy, addAccountSpy, authenticationSpy)
  return {
    sut,
    validationSpy,
    addAccountSpy,
    authenticationSpy
  }
}

const mockRequest = (): SignUpController.Request => {
  const password = faker.internet.password()
  return {
    username: faker.person.firstName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}

describe('SignUpController', () => {
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
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(httpHelper.badRequest(new MissingParamError('any_error')))
    })
  })

  describe('AddAccount', () => {
    test('Should call AddAccount with correct values', async() => {
      const { sut, addAccountSpy } = makeSut()
      const request = mockRequest()
      await sut.handle(request)
      expect(addAccountSpy.input).toEqual({
        username: request.username,
        email: request.email,
        password: request.password
      })
    })

    test('Should return Unauthorized if AddAccount throws an EmailInUseError', async() => {
      const { sut, addAccountSpy } = makeSut()
      jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(() => { throw new EmailInUseError() })
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(httpHelper.unauthorized(new AuthenticationError('Email is already in use')))
    })

    test('Should return Server Error if AddAccount throws', async() => {
      const { sut, addAccountSpy } = makeSut()
      jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(throwError)
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(httpHelper.serverError(new ServerError(undefined)))
    })
  })

  describe('Authentication', () => {
    test('Should call Authentication with correct values', async() => {
      const { sut, authenticationSpy } = makeSut()
      const request = mockRequest()
      await sut.handle(request)
      expect(authenticationSpy.input).toEqual({
        email: request.email,
        password: request.password
      })
    })

    test('Should return Server Error if Authentication throws', async() => {
      const { sut, authenticationSpy } = makeSut()
      jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(httpHelper.serverError(new ServerError(undefined)))
    })

    test('Should return OK if valid data is provided', async() => {
      const { sut, authenticationSpy } = makeSut()
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(httpHelper.ok(authenticationSpy.output))
    })
  })
})
