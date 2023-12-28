import { SignUpController } from '@/presentation/controllers/account'
import { mockAddAccountInput } from '@/tests/domain/mocks/account'
import { AddAccountSpy, AuthenticationSpy } from '@/tests/presentation/mocks/account'

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
  test('Should call AddAccount with correct values', async() => {
    const { sut, addAccountSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addAccountSpy.input).toEqual(request)
  })

  test('Should call Authentication with correct values', async() => {
    const { sut, authenticationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(authenticationSpy.input).toEqual({
      Email: request.Email,
      Password: request.Password
    })
  })
})
