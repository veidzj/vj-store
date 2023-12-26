import MockDate from 'mockdate'

import { type AddAccountRepository } from '@/application/protocols/account'
import { DbAddAccount } from '@/application/usecases/account'
import { type AddAccount } from '@/domain/usecases/account'

class AddAccountRepositorySpy implements AddAccountRepository {
  public input: AddAccountRepository.Input

  public async add(input: AddAccountRepository.Input): Promise<void> {
    this.input = input
  }
}

interface Sut {
  addAccountRepositorySpy: AddAccountRepositorySpy
  sut: DbAddAccount
}

const makeSut = (): Sut => {
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const sut = new DbAddAccount(addAccountRepositorySpy)
  return {
    sut,
    addAccountRepositorySpy
  }
}

describe('DbAddAccount', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call AddAccountRepository with correct values', async() => {
    const { sut, addAccountRepositorySpy } = makeSut()
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
