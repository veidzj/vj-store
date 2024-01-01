import MockDate from 'mockdate'

import { throwError } from '@/tests/test-helper'
import { CheckAccountByEmailRepositorySpy } from '@/tests/application/mocks/account/queries'
import { AddAccountRepositorySpy } from '@/tests/application/mocks/account/commands'
import { HasherSpy } from '@/tests/application/mocks/cryptography'
import { mockAddAccountInput, mockUsernameValidationToThrow, mockEmailValidationToThrow, mockPasswordValidationToThrow } from '@/tests/domain/mocks/account'
import { DbAddAccount } from '@/application/usecases/account'
import { EmailInUseError } from '@/domain/errors/account'

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

const expectPromiseToThrow = async(sut: DbAddAccount): Promise<void> => {
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
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()

    test('Should call CheckAccountByEmailRepository with correct email', async() => {
      const addAccountInput = mockAddAccountInput()
      await sut.add(addAccountInput)
      expect(checkAccountByEmailRepositorySpy.email).toBe(addAccountInput.email)
    })

    test('Should throw if CheckAccountByEmailRepository throws', async() => {
      jest.spyOn(checkAccountByEmailRepositorySpy, 'checkByEmail').mockImplementationOnce(throwError)
      await expectPromiseToThrow(sut)
    })

    test('Should throw EmailInUseError if CheckAccountByEmailRepository returns true', async() => {
      jest.spyOn(checkAccountByEmailRepositorySpy, 'checkByEmail').mockReturnValueOnce(Promise.resolve(true))
      const promise = sut.add(mockAddAccountInput())
      await expect(promise).rejects.toThrow(new EmailInUseError())
    })
  })

  describe('Hasher', () => {
    const { sut, hasherSpy } = makeSut()

    test('Should throw if Hasher throws', async() => {
      jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)
      await expectPromiseToThrow(sut)
    })

    test('Should call Hasher with correct password', async() => {
      const addAccountInput = mockAddAccountInput()
      await sut.add(addAccountInput)
      expect(hasherSpy.plainText).toBe(addAccountInput.password)
    })
  })

  describe('AccountValidation', () => {
    const { sut } = makeSut()

    test('Should throw if AccountValidation.validateUsername throws', async() => {
      mockUsernameValidationToThrow()
      await expectPromiseToThrow(sut)
    })

    test('Should throw if AccountValidation.validateEmail throws', async() => {
      mockEmailValidationToThrow()
      await expectPromiseToThrow(sut)
    })

    test('Should throw if AccountValidation.validatePassword throws', async() => {
      mockPasswordValidationToThrow()
      await expectPromiseToThrow(sut)
    })
  })

  describe('AddAccountRepository', () => {
    const { sut, addAccountRepositorySpy, hasherSpy } = makeSut()

    test('Should call AddAccountRepository with correct values', async() => {
      const addAccountInput = mockAddAccountInput()
      await sut.add(addAccountInput)
      expect(addAccountRepositorySpy.input.id).toBeTruthy()
      expect(addAccountRepositorySpy.input.username).toBe(addAccountInput.username)
      expect(addAccountRepositorySpy.input.email).toBe(addAccountInput.email)
      expect(addAccountRepositorySpy.input.password).toBe(hasherSpy.digest)
      expect(addAccountRepositorySpy.input.role).toBe('User')
      expect(addAccountRepositorySpy.input.isActive).toBe(true)
      expect(addAccountRepositorySpy.input.createdAt).toEqual(new Date())
      expect(addAccountRepositorySpy.input.updateHistory).toEqual([])
    })

    test('Should not throw on success', async() => {
      const promise = sut.add(mockAddAccountInput())
      await expect(promise).resolves.not.toThrow()
    })
  })
})
