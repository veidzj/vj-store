import MockDate from 'mockdate'

import { CheckAccountByEmailRepositorySpy, AddAccountRepositorySpy } from '@/tests/application/mocks/account'
import { DbAddAccount } from '@/application/usecases/account'
import { type AddAccount } from '@/domain/usecases/account'

interface Sut {
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
  addAccountRepositorySpy: AddAccountRepositorySpy
  sut: DbAddAccount
}

const makeSut = (): Sut => {
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const sut = new DbAddAccount(checkAccountByEmailRepositorySpy, addAccountRepositorySpy)
  return {
    sut,
    checkAccountByEmailRepositorySpy,
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

  test('Should call CheckAccountByEmailRepository with correct email', async() => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    const addAccountInput: AddAccount.Input = {
      Username: 'anyusername',
      Email: 'any_mail@mail.com',
      Password: 'any_password'
    }
    await sut.add(addAccountInput)
    expect(checkAccountByEmailRepositorySpy.email).toBe(addAccountInput.Email)
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
