import MockDate from 'mockdate'

import { type AddAccountRepository } from '@/application/protocols/account'
import { DbAddAccount } from '@/application/usecases/account'
import { type Account } from '@/domain/entities/account'
import { type AddAccount } from '@/domain/usecases/account'

describe('DbAddAccount', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call AddAccountRepository with correct values', async() => {
    class AddAccountRepositorySpy implements AddAccountRepository {
      public input: Account

      public async add(input: Account): Promise<void> {
        this.input = input
      }
    }
    const addAccountRepositorySpy = new AddAccountRepositorySpy()
    const sut = new DbAddAccount(addAccountRepositorySpy)
    const addAccountInput: AddAccount.Input = {
      Username: 'anyusername',
      Email: 'any_mail@mail.com',
      Password: 'any_password'
    }
    await sut.add(addAccountInput)
    expect(addAccountRepositorySpy.input.getId()).toBeTruthy()
    expect(addAccountRepositorySpy.input.getUsername()).toBe(addAccountInput.Username)
    expect(addAccountRepositorySpy.input.getEmail()).toBe(addAccountInput.Email)
    expect(addAccountRepositorySpy.input.getPassword()).toBe(addAccountInput.Password)
    expect(addAccountRepositorySpy.input.isActive()).toBe(true)
    expect(addAccountRepositorySpy.input.getCreatedAt()).toEqual(new Date())
    expect(addAccountRepositorySpy.input.getUpdateHistory()).toBeNull()
  })
})
