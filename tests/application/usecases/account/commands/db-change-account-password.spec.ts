import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { CheckAccountByEmailRepositorySpy } from '@/tests/application/mocks/account/queries'
import { ChangeAccountPasswordRepositorySpy } from '@/tests/application/mocks/account/commands'
import { DbChangeAccountPassword } from '@/application/usecases/account/commands'
import { AccountValidation } from '@/domain/entities/account'
import { AccountNotFoundError } from '@/domain/errors/account'

interface Sut {
  sut: DbChangeAccountPassword
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
  changeAccountPasswordRepositorySpy: ChangeAccountPasswordRepositorySpy
}

const makeSut = (): Sut => {
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  checkAccountByEmailRepositorySpy.output = true
  const changeAccountPasswordRepositorySpy = new ChangeAccountPasswordRepositorySpy()
  const sut = new DbChangeAccountPassword(checkAccountByEmailRepositorySpy, changeAccountPasswordRepositorySpy)
  return {
    sut,
    checkAccountByEmailRepositorySpy,
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

  describe('CheckAccountByEmailRepository', () => {
    test('Should call CheckAccountByEmailRepository with correct email', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      await sut.changePassword(accountEmail, currentPassword, newPassword)
      expect(checkAccountByEmailRepositorySpy.email).toBe(accountEmail)
    })

    test('Should throw AccountNotFoundError if CheckAccountByEmailRepository returns false', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      checkAccountByEmailRepositorySpy.output = false
      const promise = sut.changePassword(accountEmail, currentPassword, newPassword)
      await expect(promise).rejects.toThrow(new AccountNotFoundError())
    })

    test('Should throw if CheckAccountByEmailRepository throws', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      jest.spyOn(checkAccountByEmailRepositorySpy, 'checkByEmail').mockImplementationOnce(throwError)
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
