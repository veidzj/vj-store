import { SignInController } from '@/presentation/controllers/account'
import { mockAuthenticationInput } from '@/tests/domain/mocks/account'
import { AuthenticationSpy } from '../../mocks/account'

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
})
