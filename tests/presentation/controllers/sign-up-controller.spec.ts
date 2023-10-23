import { faker } from '@faker-js/faker'
import { ValidationSpy } from '../mocks/mock-validation'
import { SignUpController } from '../../../src/presentation/controllers/sign-up-controller'
import { badRequest, forbidden, ok, serverError } from '../../../src/presentation/helpers/http-helper'
import { AddAccountSpy, AuthenticationSpy } from '../mocks/mock-account'
import { ServerError } from '../../../src/presentation/errors/server-error'
import { EmailInUseError } from '../../../src/presentation/errors/email-in-use-error'

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
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}

describe('SignUpController', () => {
  describe('Validation', () => {
    test('Should call Validation with correct values', async() => {
      const { sut, validationSpy } = makeSut()
      const request = mockRequest()
      await sut.handle(request)
      expect(validationSpy.input).toEqual(request)
    })

    test('Should return Bad Request if Validation returns an error', async() => {
      const { sut, validationSpy } = makeSut()
      validationSpy.error = new Error(faker.word.words())
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(badRequest(validationSpy.error))
    })
  })

  describe('AddAccount', () => {
    test('Should call AddAccount with correct values', async() => {
      const { sut, addAccountSpy } = makeSut()
      const request = mockRequest()
      await sut.handle(request)
      expect(addAccountSpy.input).toEqual({
        name: request.name,
        email: request.email,
        password: request.password
      })
    })

    test('Should return Forbidden if AddAccount returns false', async() => {
      const { sut, addAccountSpy } = makeSut()
      addAccountSpy.output = false
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
    })

    test('Should return Server Error if AddAccount throws', async() => {
      const { sut, addAccountSpy } = makeSut()
      jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(() => { throw new Error() })
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(serverError(new ServerError(undefined)))
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
      jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(() => { throw new Error() })
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(serverError(new ServerError(undefined)))
    })

    test('Should return OK if valid data is provided', async() => {
      const { sut, authenticationSpy } = makeSut()
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(ok(authenticationSpy.output))
    })
  })
})
