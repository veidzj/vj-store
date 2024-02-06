import MockDate from 'mockdate'

import { throwError } from '@/tests/test-helper'
import { CheckAccountByEmailRepositorySpy } from '@/tests/application/mocks/account/queries'
import { AddAccountRepositorySpy } from '@/tests/application/mocks/account/commands'
import { HasherSpy } from '@/tests/application/mocks/cryptography'
import { mockAddAccountInput } from '@/tests/domain/mocks/account'
import { DbAddAccount } from '@/application/usecases/account/authentication'
import { AccountValidation } from '@/domain/entities/account'
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
      expect(checkAccountByEmailRepositorySpy.email).toBe(addAccountInput.email)
    })

    test('Should throw if CheckAccountByEmailRepository throws', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      jest.spyOn(checkAccountByEmailRepositorySpy, 'checkByEmail').mockImplementationOnce(throwError)
      const promise = sut.add(mockAddAccountInput())
      await expect(promise).rejects.toThrow()
    })

    test('Should throw EmailInUseError if CheckAccountByEmailRepository returns true', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      checkAccountByEmailRepositorySpy.output = true
      const promise = sut.add(mockAddAccountInput())
      await expect(promise).rejects.toThrow(new EmailInUseError())
    })
  })

  describe('Hasher', () => {
    test('Should call Hasher with correct password', async() => {
      const { sut, hasherSpy } = makeSut()
      const addAccountInput = mockAddAccountInput()
      await sut.add(addAccountInput)
      expect(hasherSpy.plainText).toBe(addAccountInput.password)
    })

    test('Should throw if Hasher throws', async() => {
      const { sut, hasherSpy } = makeSut()
      jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)
      const promise = sut.add(mockAddAccountInput())
      await expect(promise).rejects.toThrow()
    })
  })

  describe('AccountValidation', () => {
    test('Should throw if AccountValidation.validateUsername throws', async() => {
      const { sut } = makeSut()
      jest.spyOn(AccountValidation, 'validateUsername').mockImplementationOnce(throwError)
      const promise = sut.add(mockAddAccountInput())
      await expect(promise).rejects.toThrow()
    })

    test('Should throw if AccountValidation.validateEmail throws', async() => {
      const { sut } = makeSut()
      jest.spyOn(AccountValidation, 'validateEmail').mockImplementationOnce(throwError)
      const promise = sut.add(mockAddAccountInput())
      await expect(promise).rejects.toThrow()
    })

    test('Should throw if AccountValidation.validatePassword throws', async() => {
      const { sut } = makeSut()
      jest.spyOn(AccountValidation, 'validatePassword').mockImplementationOnce(throwError)
      const promise = sut.add(mockAddAccountInput())
      await expect(promise).rejects.toThrow()
    })
  })

  describe('AddAccountRepository', () => {
    test('Should call AddAccountRepository with correct values', async() => {
      const { sut, addAccountRepositorySpy, hasherSpy } = makeSut()
      const addAccountInput = mockAddAccountInput()
      await sut.add(addAccountInput)
      expect(addAccountRepositorySpy.input.id).toBeTruthy()
      expect(addAccountRepositorySpy.input.username).toBe(addAccountInput.username)
      expect(addAccountRepositorySpy.input.email).toBe(addAccountInput.email)
      expect(addAccountRepositorySpy.input.password).toBe(hasherSpy.digest)
      expect(addAccountRepositorySpy.input.role).toBe('user')
      expect(addAccountRepositorySpy.input.isActive).toBe(true)
      expect(addAccountRepositorySpy.input.createdAt).toEqual(new Date())
      expect(addAccountRepositorySpy.input.updatedAt).toEqual(new Date())
    })

    test('Should not throw on success', async() => {
      const { sut } = makeSut()
      const promise = sut.add(mockAddAccountInput())
      await expect(promise).resolves.not.toThrow()
    })
  })
})
