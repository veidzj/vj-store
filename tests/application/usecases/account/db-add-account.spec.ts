import MockDate from 'mockdate'

import { CheckAccountByEmailRepositorySpy } from '@/tests/application/mocks/account/queries'
import { AddAccountRepositorySpy } from '@/tests/application/mocks/account/commands'
import { HasherSpy } from '@/tests/application/mocks/cryptography'
import { mockAddAccountInput, mockUsernameValidationToThrow, mockEmailValidationToThrow, mockPasswordValidationToThrow } from '@/tests/domain/mocks/account'
import { DbAddAccount } from '@/application/usecases/account'
import { EmailInUseError } from '@/application/errors/account'

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

const expectToThrow = async(sut: DbAddAccount): Promise<void> => {
  const promise = sut.add(mockAddAccountInput())
  await expect(promise).rejects.toThrow()
}

describe('DbAddAccount', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  describe('CheckAccountByEmailRepository', () => {
    test('Should call CheckAccountByEmailRepository with correct email', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      const addAccountInput = mockAddAccountInput()
      await sut.add(addAccountInput)
      expect(checkAccountByEmailRepositorySpy.email).toBe(addAccountInput.Email)
    })

    test('Should throw if CheckAccountByEmailRepository throws', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      jest.spyOn(checkAccountByEmailRepositorySpy, 'checkByEmail').mockImplementationOnce(() => { throw new Error() })
      await expectToThrow(sut)
    })

    test('Should throw EmailInUseError if CheckAccountByEmailRepository returns true', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      jest.spyOn(checkAccountByEmailRepositorySpy, 'checkByEmail').mockReturnValueOnce(Promise.resolve(true))
      const promise = sut.add(mockAddAccountInput())
      await expect(promise).rejects.toThrow(new EmailInUseError())
    })
  })

  describe('Hasher', () => {
    test('Should throw if Hasher throws', async() => {
      const { sut, hasherSpy } = makeSut()
      jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(() => { throw new Error() })
      await expectToThrow(sut)
    })

    test('Should call Hasher with correct password', async() => {
      const { sut, hasherSpy } = makeSut()
      const addAccountInput = mockAddAccountInput()
      await sut.add(addAccountInput)
      expect(hasherSpy.plainText).toBe(addAccountInput.Password)
    })
  })

  describe('AccountValidation', () => {
    test('Should throw if AccountValidation.validateUsername throws', async() => {
      const { sut } = makeSut()
      mockUsernameValidationToThrow()
      await expectToThrow(sut)
    })

    test('Should throw if AccountValidation.validateEmail throws', async() => {
      const { sut } = makeSut()
      mockEmailValidationToThrow()
      await expectToThrow(sut)
    })

    test('Should throw if AccountValidation.validatePassword throws', async() => {
      const { sut } = makeSut()
      mockPasswordValidationToThrow()
      await expectToThrow(sut)
    })
  })

  describe('AddAccountRepository', () => {
    test('Should call AddAccountRepository with correct values', async() => {
      const { sut, addAccountRepositorySpy, hasherSpy } = makeSut()
      const addAccountInput = mockAddAccountInput()
      await sut.add(addAccountInput)
      expect(addAccountRepositorySpy.account.getId()).toBeTruthy()
      expect(addAccountRepositorySpy.account.getUsername()).toBe(addAccountInput.Username)
      expect(addAccountRepositorySpy.account.getEmail()).toBe(addAccountInput.Email)
      expect(addAccountRepositorySpy.account.getPassword()).toBe(hasherSpy.digest)
      expect(addAccountRepositorySpy.account.isActive()).toBe(true)
      expect(addAccountRepositorySpy.account.getCreatedAt()).toEqual(new Date())
      expect(addAccountRepositorySpy.account.getUpdateHistory()).toBeNull()
    })

    test('Should not throw on success', async() => {
      const { sut } = makeSut()
      const promise = sut.add(mockAddAccountInput())
      await expect(promise).resolves.not.toThrow()
    })
  })
})
