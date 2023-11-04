import { GetAccountByTokenSpy } from '@/tests/presentation/mocks'
import { AuthMiddleware } from '@/presentation/middlewares'
import { HttpHelper } from '@/presentation/helpers'
import { AccessDeniedError } from '@/presentation/errors'

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
  accessToken: 'any_token'
})

describe('AuthMiddleware', () => {
  const httpHelper = new HttpHelper()

  test('Should call GetAccountByToken with correct values', async() => {
    const role = 'any_role'
    const { sut, getAccountByTokenSpy } = makeSut(role)
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(getAccountByTokenSpy.accessToken).toBe(httpRequest.accessToken)
    expect(getAccountByTokenSpy.role).toBe(role)
  })

  test('Should return Forbidden if GetAccountByToken returns null', async() => {
    const { sut, getAccountByTokenSpy } = makeSut()
    getAccountByTokenSpy.id = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(httpHelper.forbidden(new AccessDeniedError()))
  })
})
