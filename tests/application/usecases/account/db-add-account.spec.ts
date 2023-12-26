import MockDate from 'mockdate'

import { CheckAccountByEmailRepositorySpy, AddAccountRepositorySpy } from '@/tests/application/mocks/account'
import { HasherSpy } from '@/tests/application/mocks/cryptography'
import { mockAddAccountInput } from '@/tests/domain/mocks/account'
import { DbAddAccount } from '@/application/usecases/account'
import { EmailInUseError } from '@/application/errors/account'
import { AccountValidation } from '@/domain/entities/account'

// jest.mock('@/domain/entities/account/account-validation')

interface Sut {
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
  hasherSpy: HasherSpy
  addAccountRepositorySpy: AddAccountRepositorySpy
  sut: DbAddAccount
}

const makeSut = (): Sut => {
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  const hasherSpy = new HasherSpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const sut = new DbAddAccount(checkAccountByEmailRepositorySpy, hasherSpy, addAccountRepositorySpy)
  return {
    checkAccountByEmailRepositorySpy,
    hasherSpy,
    addAccountRepositorySpy,
    sut
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
    const addAccountInput = mockAddAccountInput()

    await sut.add(addAccountInput)

    expect(checkAccountByEmailRepositorySpy.email).toBe(addAccountInput.Email)
  })

  test('Should throw if CheckAccountByEmailRepository throws', async() => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(checkAccountByEmailRepositorySpy, 'checkByEmail').mockImplementationOnce(() => { throw new Error() })

    const promise = sut.add(mockAddAccountInput())

    await expect(promise).rejects.toThrow()
  })

  test('Should throw EmailInUseError if CheckAccountByEmailRepository returns true', async() => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(checkAccountByEmailRepositorySpy, 'checkByEmail').mockReturnValueOnce(Promise.resolve(true))

    const promise = sut.add(mockAddAccountInput())

    await expect(promise).rejects.toThrow(new EmailInUseError())
  })

  test('Should call Hasher with correct password', async() => {
    const { sut, hasherSpy } = makeSut()
    const addAccountInput = mockAddAccountInput()

    await sut.add(addAccountInput)

    expect(hasherSpy.plainText).toBe(addAccountInput.Password)
  })

  test('Should call AddAccountRepository with correct values', async() => {
    const { sut, addAccountRepositorySpy, hasherSpy } = makeSut()
    const addAccountInput = mockAddAccountInput()

    await sut.add(addAccountInput)

    expect(addAccountRepositorySpy.input.getId()).toBeTruthy()
    expect(addAccountRepositorySpy.input.getUsername()).toBe(addAccountInput.Username)
    expect(addAccountRepositorySpy.input.getEmail()).toBe(addAccountInput.Email)
    expect(addAccountRepositorySpy.input.getPassword()).toBe(hasherSpy.digest)
    expect(addAccountRepositorySpy.input.isActive()).toBe(true)
    expect(addAccountRepositorySpy.input.getCreatedAt()).toEqual(new Date())
    expect(addAccountRepositorySpy.input.getUpdateHistory()).toBeNull()
  })

  test('Should throw if AccountValidation.validateUsername throws', async() => {
    const { sut } = makeSut()
    jest.spyOn(AccountValidation, 'validateUsername').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.add(mockAddAccountInput())

    await expect(promise).rejects.toThrow()
  })

  test('Should throw if AccountValidation.validateEmail throws', async() => {
    const { sut } = makeSut()
    jest.spyOn(AccountValidation, 'validateEmail').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.add(mockAddAccountInput())

    await expect(promise).rejects.toThrow()
  })

  test('Should throw if AccountValidation.validatePassword throws', async() => {
    const { sut } = makeSut()
    jest.spyOn(AccountValidation, 'validatePassword').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.add(mockAddAccountInput())

    await expect(promise).rejects.toThrow()
  })
})
