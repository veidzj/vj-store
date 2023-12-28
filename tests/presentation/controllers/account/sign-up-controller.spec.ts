import { SignUpController } from '@/presentation/controllers/account'
import { mockAddAccountInput } from '@/tests/domain/mocks/account'
import { AddAccountSpy } from '@/tests/presentation/mocks/account'

interface Sut {
  sut: SignUpController
  addAccountSpy: AddAccountSpy
}

const makeSut = (): Sut => {
  const addAccountSpy = new AddAccountSpy()
  const sut = new SignUpController(addAccountSpy)
  return {
    addAccountSpy,
    sut
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
})
