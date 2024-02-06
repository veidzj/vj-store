import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { GetAccountEmailByTokenSpy } from '@/tests/presentation/mocks/account'
import { AuthMiddleware } from '@/presentation/middlewares'
import { HttpHelper } from '@/presentation/helpers'
import { InvalidCredentialsError, TokenError, AccessDeniedError } from '@/domain/errors/account'

interface Sut {
  sut: AuthMiddleware
  getAccountEmailByTokenSpy: GetAccountEmailByTokenSpy
}

const makeSut = (role: string = 'user'): Sut => {
  const getAccountEmailByTokenSpy = new GetAccountEmailByTokenSpy()
  const sut = new AuthMiddleware(getAccountEmailByTokenSpy, role)
  return {
    sut,
    getAccountEmailByTokenSpy
  }
}

const mockRequest = (): AuthMiddleware.Request => ({
  accessToken: faker.string.uuid()
})

describe('AuthMiddleware', () => {
  test('Should return unauthorized if accessToken is not provided', async() => {
    const { sut } = makeSut()
    const response = await sut.handle({})
    expect(response).toEqual(HttpHelper.unauthorized(new InvalidCredentialsError()))
  })

  test('Should call GetAccountEmailByToken with correct values', async() => {
    const role = faker.word.words()
    const { sut, getAccountEmailByTokenSpy } = makeSut(role)
    const request = mockRequest()
    await sut.handle(request)
    expect(getAccountEmailByTokenSpy.accessToken).toBe(request.accessToken)
    expect(getAccountEmailByTokenSpy.role).toBe(role)
  })

  test('Should return unauthorized if GetAccountEmailByToken throws TokenError', async() => {
    const { sut, getAccountEmailByTokenSpy } = makeSut()
    jest.spyOn(getAccountEmailByTokenSpy, 'getByToken').mockImplementationOnce(() => { throw new TokenError() })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.unauthorized(new TokenError()))
  })

  test('Should return forbidden if GetAccountEmailByToken throws AccessDeniedError', async() => {
    const { sut, getAccountEmailByTokenSpy } = makeSut()
    jest.spyOn(getAccountEmailByTokenSpy, 'getByToken').mockImplementationOnce(() => { throw new AccessDeniedError() })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.forbidden(new AccessDeniedError()))
  })

  test('Should return serverError if GetAccountEmailByToken throws', async() => {
    const { sut, getAccountEmailByTokenSpy } = makeSut()
    jest.spyOn(getAccountEmailByTokenSpy, 'getByToken').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.serverError(new Error()))
  })

  test('Should return ok with email on success', async() => {
    const { sut, getAccountEmailByTokenSpy } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.ok({
      accountEmail: getAccountEmailByTokenSpy.output
    }))
  })
})
