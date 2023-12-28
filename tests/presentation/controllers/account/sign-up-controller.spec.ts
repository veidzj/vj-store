import { SignUpController } from '@/presentation/controllers/account'
import { type AddAccount } from '@/domain/usecases/account'
import { mockAddAccountInput } from '@/tests/domain/mocks/account'

const mockRequest = (): SignUpController.Request => mockAddAccountInput()

describe('SignUpController', () => {
  test('Should call AddAccount with correct values', async() => {
    class AddAccountSpy implements AddAccount {
      public input: AddAccount.Input

      public async add(input: AddAccount.Input): Promise<void> {
        this.input = input
      }
    }
    const addAccountSpy = new AddAccountSpy()
    const sut = new SignUpController(addAccountSpy)
    const request = mockRequest()
    await sut.handle(request)
    expect(addAccountSpy.input).toEqual(request)
  })
})
