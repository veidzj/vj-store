import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { AuthMiddleware } from '@/presentation/middlewares'
import { HttpHelper } from '@/presentation/helpers'
import { InvalidCredentialsError, TokenError, AccessDeniedError } from '@/domain/errors/account'
import { GetAccountIdByTokenSpy } from '@/tests/presentation/mocks/account'

interface Sut {
  sut: AuthMiddleware
  getAccountIdByTokenSpy: GetAccountIdByTokenSpy
}

const makeSut = (role: string = 'user'): Sut => {
  const getAccountIdByTokenSpy = new GetAccountIdByTokenSpy()
  const sut = new AuthMiddleware(getAccountIdByTokenSpy, role)
  return {
    sut,
    getAccountIdByTokenSpy
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

  test('Should call GetAccountIdByToken with correct values', async() => {
    const role = faker.word.words()
    const { sut, getAccountIdByTokenSpy } = makeSut(role)
    const request = mockRequest()
    await sut.handle(request)
    expect(getAccountIdByTokenSpy.accessToken).toBe(request.accessToken)
    expect(getAccountIdByTokenSpy.role).toBe(role)
  })

  test('Should return unauthorized if GetAccountIdByToken throws TokenError', async() => {
    const { sut, getAccountIdByTokenSpy } = makeSut()
    jest.spyOn(getAccountIdByTokenSpy, 'getByToken').mockImplementationOnce(() => { throw new TokenError() })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.unauthorized(new TokenError()))
  })

  test('Should return forbidden if GetAccountIdByToken throws AccessDeniedError', async() => {
    const { sut, getAccountIdByTokenSpy } = makeSut()
    jest.spyOn(getAccountIdByTokenSpy, 'getByToken').mockImplementationOnce(() => { throw new AccessDeniedError() })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.forbidden(new AccessDeniedError()))
  })

  test('Should return serverError if GetAccountIdByToken throws an unmapped error', async() => {
    const { sut, getAccountIdByTokenSpy } = makeSut()
    jest.spyOn(getAccountIdByTokenSpy, 'getByToken').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.serverError(new Error()))
  })

  test('Should return ok with accountId on success', async() => {
    const { sut, getAccountIdByTokenSpy } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.ok({
      accountId: getAccountIdByTokenSpy.accountId
    }))
  })
})
