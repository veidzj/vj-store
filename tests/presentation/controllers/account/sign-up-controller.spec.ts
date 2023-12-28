import { SignUpController } from '@/presentation/controllers/account'
import { type AddAccount } from '@/domain/usecases/account'

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
    await sut.handle({
      Username: 'anyUsername',
      Email: 'anyEmail@mail.com',
      Password: 'anyPassword'
    })
    expect(addAccountSpy.input).toEqual({
      Username: 'anyUsername',
      Email: 'anyEmail@mail.com',
      Password: 'anyPassword'
    })
  })
})
