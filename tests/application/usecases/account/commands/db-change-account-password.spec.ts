import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { GetAccountByEmailRepositorySpy } from '@/tests/application/mocks/account/queries'
import { HashComparerSpy } from '@/tests/application/mocks/cryptography'
import { ChangeAccountPasswordRepositorySpy } from '@/tests/application/mocks/account/commands'
import { DbChangeAccountPassword } from '@/application/usecases/account/commands'
import { AccountValidation } from '@/domain/entities/account'
import { AccountNotFoundError, InvalidCredentialsError } from '@/domain/errors/account'

interface Sut {
  sut: DbChangeAccountPassword
  getAccountByEmailRepositorySpy: GetAccountByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
  changeAccountPasswordRepositorySpy: ChangeAccountPasswordRepositorySpy
}

const makeSut = (): Sut => {
  const getAccountByEmailRepositorySpy = new GetAccountByEmailRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const changeAccountPasswordRepositorySpy = new ChangeAccountPasswordRepositorySpy()
  const sut = new DbChangeAccountPassword(getAccountByEmailRepositorySpy, hashComparerSpy, changeAccountPasswordRepositorySpy)
  return {
    sut,
    getAccountByEmailRepositorySpy,
    hashComparerSpy,
    changeAccountPasswordRepositorySpy
  }
}

describe('DbChangeAccountPassword', () => {
  let accountEmail: string
  let currentPassword: string
  let newPassword: string

  beforeEach(() => {
    accountEmail = faker.internet.email()
    currentPassword = faker.internet.password()
    newPassword = faker.internet.password()
  })

  describe('GetAccountByEmailRepository', () => {
    test('Should call GetAccountByEmailRepository with correct email', async() => {
      const { sut, getAccountByEmailRepositorySpy } = makeSut()
      await sut.changePassword(accountEmail, currentPassword, newPassword)
      expect(getAccountByEmailRepositorySpy.email).toBe(accountEmail)
    })

    test('Should throw AccountNotFoundError if GetAccountByEmailRepository returns null', async() => {
      const { sut, getAccountByEmailRepositorySpy } = makeSut()
      getAccountByEmailRepositorySpy.output = null
      const promise = sut.changePassword(accountEmail, currentPassword, newPassword)
      await expect(promise).rejects.toThrow(new AccountNotFoundError())
    })

    test('Should throw if GetAccountByEmailRepository throws', async() => {
      const { sut, getAccountByEmailRepositorySpy } = makeSut()
      jest.spyOn(getAccountByEmailRepositorySpy, 'getByEmail').mockImplementationOnce(throwError)
      const promise = sut.changePassword(accountEmail, currentPassword, newPassword)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('HashComparer', () => {
    test('Should call HashComparer with correct values', async() => {
      const { sut, hashComparerSpy, getAccountByEmailRepositorySpy } = makeSut()
      await sut.changePassword(accountEmail, currentPassword, newPassword)
      expect(hashComparerSpy.plainText).toBe(currentPassword)
      expect(hashComparerSpy.digest).toBe(getAccountByEmailRepositorySpy.output?.password)
    })

    test('Should throw InvalidCredentialsError if HashComparer returns false', async() => {
      const { sut, hashComparerSpy } = makeSut()
      hashComparerSpy.isMatch = false
      const promise = sut.changePassword(accountEmail, currentPassword, newPassword)
      await expect(promise).rejects.toThrow(new InvalidCredentialsError())
    })

    test('Should throw if HashComparer throws', async() => {
      const { sut, hashComparerSpy } = makeSut()
      jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)
      const promise = sut.changePassword(accountEmail, currentPassword, newPassword)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('AccountValidation', () => {
    test('Should throw if AccountValidation.validatePassword throws', async() => {
      const { sut } = makeSut()
      jest.spyOn(AccountValidation, 'validatePassword').mockImplementationOnce(throwError)
      const promise = sut.changePassword(accountEmail, currentPassword, newPassword)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('ChangeAccountPasswordRepository', () => {
    test('Should call ChangeAccountPasswordRepository with correct values', async() => {
      const { sut, changeAccountPasswordRepositorySpy } = makeSut()
      await sut.changePassword(accountEmail, currentPassword, newPassword)
      expect(changeAccountPasswordRepositorySpy.accountEmail).toBe(accountEmail)
      expect(changeAccountPasswordRepositorySpy.newPassword).toBe(newPassword)
    })

    test('Should throw if ChangeAccountPasswordRepository throws', async() => {
      const { sut, changeAccountPasswordRepositorySpy } = makeSut()
      jest.spyOn(changeAccountPasswordRepositorySpy, 'changePassword').mockImplementationOnce(throwError)
      const promise = sut.changePassword(accountEmail, currentPassword, newPassword)
      await expect(promise).rejects.toThrow()
    })

    test('Should not throw on success', async() => {
      const { sut } = makeSut()
      const promise = sut.changePassword(accountEmail, currentPassword, newPassword)
      await expect(promise).resolves.not.toThrow()
    })
  })
})
