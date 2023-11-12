import { faker } from '@faker-js/faker'
import { GetAccountByTokenSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { AuthMiddleware } from '@/presentation/middlewares'
import { HttpHelper } from '@/presentation/helpers'
import { AccessDeniedError } from '@/presentation/errors'
import { AuthenticationError } from '@/domain/errors'

interface Sut {
  sut: AuthMiddleware
  getAccountByTokenSpy: GetAccountByTokenSpy
}

const makeSut = (role?: string): Sut => {
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
  const httpHelper = new HttpHelper()

  test('Should call GetAccountByToken with correct values', async() => {
    const role = faker.word.words()
    const { sut, getAccountByTokenSpy } = makeSut(role)
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(getAccountByTokenSpy.accessToken).toBe(httpRequest.accessToken)
    expect(getAccountByTokenSpy.role).toBe(role)
  })

  test('Should return Forbidden if access token is not provided', async() => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(httpHelper.forbidden(new AccessDeniedError()))
  })

  test('Should return Forbidden if GetAccountByToken throws an AuthenticationError', async() => {
    const { sut, getAccountByTokenSpy } = makeSut()
    jest.spyOn(getAccountByTokenSpy, 'getByToken').mockImplementationOnce(() => { throw new AuthenticationError(faker.word.words()) })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(httpHelper.forbidden(new AccessDeniedError()))
  })

  test('Should return ServerError if GetAccountByToken throws', async() => {
    const { sut, getAccountByTokenSpy } = makeSut()
    jest.spyOn(getAccountByTokenSpy, 'getByToken').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(httpHelper.serverError(new Error()))
  })

  test('Should return OK if GetAccountByToken returns an account', async() => {
    const { sut, getAccountByTokenSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(httpHelper.ok({
      accountId: getAccountByTokenSpy.account.id
    }))
  })
})
