import { faker } from '@faker-js/faker'

import { GetAccountByTokenSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { AuthMiddleware } from '@/presentation/middlewares'
import { HttpHelper } from '@/presentation/helpers'
import { AuthenticationError, AuthorizationError } from '@/domain/errors'
import { InvalidCredentialsError } from '@/application/errors/auth'

interface Sut {
  sut: AuthMiddleware
  getAccountByTokenSpy: GetAccountByTokenSpy
}

const makeSut = (role: string = 'user'): Sut => {
  const getAccountByTokenSpy = new GetAccountByTokenSpy()
  const sut = new AuthMiddleware(getAccountByTokenSpy, role)
  return {
    sut,
    getAccountByTokenSpy
  }
}

const mockRequest = (): AuthMiddleware.Request => ({
  accessToken: faker.string.uuid()
})

describe('AuthMiddleware', () => {
  test('Should return unauthorized if access token is not provided', async() => {
    const { sut } = makeSut()
    const response = await sut.handle({})
    expect(response).toEqual(HttpHelper.unauthorized(new InvalidCredentialsError()))
  })

  test('Should call GetAccountByToken with correct values', async() => {
    const role = faker.word.words()
    const { sut, getAccountByTokenSpy } = makeSut(role)
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(getAccountByTokenSpy.accessToken).toBe(httpRequest.accessToken)
    expect(getAccountByTokenSpy.role).toBe(role)
  })

  test('Should return unauthorized if GetAccountByToken throws an AuthenticationError', async() => {
    const { sut, getAccountByTokenSpy } = makeSut()
    const errorMessage = faker.word.words()
    jest.spyOn(getAccountByTokenSpy, 'getByToken').mockImplementationOnce(() => { throw new AuthenticationError(errorMessage) })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.unauthorized(new AuthenticationError(errorMessage)))
  })

  test('Should return forbidden if GetAccountByToken throws an AuthorizationError', async() => {
    const { sut, getAccountByTokenSpy } = makeSut()
    const errorMessage = faker.word.words()
    jest.spyOn(getAccountByTokenSpy, 'getByToken').mockImplementationOnce(() => { throw new AuthorizationError(errorMessage) })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.forbidden(new AuthorizationError(errorMessage)))
  })

  test('Should return serverError if GetAccountByToken throws', async() => {
    const { sut, getAccountByTokenSpy } = makeSut()
    jest.spyOn(getAccountByTokenSpy, 'getByToken').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.serverError(new Error()))
  })

  test('Should return ok if GetAccountByToken returns an account', async() => {
    const { sut, getAccountByTokenSpy } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.ok({
      accountId: getAccountByTokenSpy.account.id
    }))
  })
})
