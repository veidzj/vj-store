import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { AddAccountSpy, AuthenticationSpy } from '@/tests/presentation/mocks/account'
import { mockAddAccountInput } from '@/tests/domain/mocks/account'
import { SignUpController } from '@/presentation/controllers/account'
import { HttpHelper } from '@/presentation/helpers'
import { EntityValidationError } from '@/domain/errors'
import { EmailInUseError, AccountNotFoundError, InvalidCredentialsError } from '@/domain/errors/account'

interface Sut {
  sut: SignUpController
  addAccountSpy: AddAccountSpy
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): Sut => {
  const addAccountSpy = new AddAccountSpy()
  const authenticationSpy = new AuthenticationSpy()
  const sut = new SignUpController(addAccountSpy, authenticationSpy)
  return {
    sut,
    addAccountSpy,
    authenticationSpy
  }
}

const mockRequest = (): SignUpController.Request => mockAddAccountInput()

describe('SignUpController', () => {
  describe('AddAccount', () => {
    const { sut, addAccountSpy } = makeSut()

    test('Should call AddAccount with correct values', async() => {
      const request = mockRequest()
      await sut.handle(request)
      expect(addAccountSpy.input).toEqual(request)
    })

    test('Should return badRequest if AddAccount throws EntityValidationError', async() => {
      const errorMessage = faker.word.words()
      jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(() => {
        throw new EntityValidationError(errorMessage)
      })
      const response = await sut.handle(mockRequest())
      expect(response).toEqual(HttpHelper.badRequest(new EntityValidationError(errorMessage)))
    })

    test('Should return conflict if AddAccount throws EmailInUseError', async() => {
      jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(() => {
        throw new EmailInUseError()
      })
      const response = await sut.handle(mockRequest())
      expect(response).toEqual(HttpHelper.conflict(new EmailInUseError()))
    })

    test('Should return serverError if AddAccount throws', async() => {
      jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(throwError)
      const response = await sut.handle(mockRequest())
      expect(response).toEqual(HttpHelper.serverError(new Error()))
    })
  })

  describe('Authentication', () => {
    const { sut, authenticationSpy } = makeSut()

    test('Should call Authentication with correct values', async() => {
      const request = mockRequest()
      await sut.handle(request)
      expect(authenticationSpy.input).toEqual({
        email: request.email,
        password: request.password
      })
    })

    test('Should return notFound if Authentication throws AccountNotFoundError', async() => {
      jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(() => {
        throw new AccountNotFoundError()
      })
      const response = await sut.handle(mockRequest())
      expect(response).toEqual(HttpHelper.notFound(new AccountNotFoundError()))
    })

    test('Should return unauthorized if Authentication throws InvalidCredentialsError', async() => {
      jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(() => {
        throw new InvalidCredentialsError()
      })
      const response = await sut.handle(mockRequest())
      expect(response).toEqual(HttpHelper.unauthorized(new InvalidCredentialsError()))
    })

    test('Should return serverError if Authentication throws', async() => {
      jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)
      const response = await sut.handle(mockRequest())
      expect(response).toEqual(HttpHelper.serverError(new Error()))
    })

    test('Should return ok with accessToken on success', async() => {
      const response = await sut.handle(mockRequest())
      expect(response).toEqual(HttpHelper.ok({
        accessToken: authenticationSpy.accessToken
      }))
    })
  })
})
