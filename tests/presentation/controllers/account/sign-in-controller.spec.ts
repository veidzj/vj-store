import { AuthenticationSpy } from '@/tests/presentation/mocks/account'
import { mockAuthenticationInput } from '@/tests/domain/mocks/account'
import { SignInController } from '@/presentation/controllers/account'
import { HttpHelper } from '@/presentation/helpers'
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
  test('Should call Authentication with correct values', async() => {
    const { sut, authenticationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(authenticationSpy.input).toEqual({
      email: request.email,
      password: request.password
    })
  })

  test('Should return notFound if Authentication throws AccountNotFoundError', async() => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(() => {
      throw new AccountNotFoundError()
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.notFound(new AccountNotFoundError()))
  })

  test('Should return unauthorized if Authentication throws InvalidCredentialsError', async() => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(() => {
      throw new InvalidCredentialsError()
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.unauthorized(new InvalidCredentialsError()))
  })
})
