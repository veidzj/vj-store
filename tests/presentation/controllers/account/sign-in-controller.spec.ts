import { throwError } from '@/tests/test-helper'
import { AuthenticationSpy } from '@/tests/presentation/mocks/account'
import { mockAuthenticationInput } from '@/tests/domain/mocks/account'
import { SignInController } from '@/presentation/controllers/account'
import { HttpHelper } from '@/presentation/helpers'
import { ServerError } from '@/presentation/errors'
import { AccountNotFoundError, InvalidCredentialsError } from '@/domain/errors/account'

interface Sut {
  sut: SignInController
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): Sut => {
  const authenticationSpy = new AuthenticationSpy()
  const sut = new SignInController(authenticationSpy)
  return {
    sut,
    authenticationSpy
  }
}

const mockRequest = (): SignInController.Request => mockAuthenticationInput()

describe('SignInController', () => {
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

  test('Should return serverError if Authentication throws an unmapped error', async() => {
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.serverError(new ServerError(undefined)))
  })

  test('Should return ok with accessToken on success', async() => {
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.ok({
      accessToken: authenticationSpy.accessToken
    }))
  })
})
