import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { CheckAccountByEmailRepositorySpy } from '@/tests/application/mocks/account/queries'
import { ChangeEmailRepositorySpy } from '@/tests/application/mocks/account/commands'
import { DbChangeEmail } from '@/application/usecases/account/commands'
import { AccountValidation } from '@/domain/entities/account'
import { AccountNotFoundError } from '@/domain/errors/account'

interface Sut {
  sut: DbChangeEmail
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
  changeEmailRepositorySpy: ChangeEmailRepositorySpy
}

const makeSut = (): Sut => {
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  checkAccountByEmailRepositorySpy.output = true
  const changeEmailRepositorySpy = new ChangeEmailRepositorySpy()
  const sut = new DbChangeEmail(checkAccountByEmailRepositorySpy, changeEmailRepositorySpy)
  return {
    sut,
    checkAccountByEmailRepositorySpy,
    changeEmailRepositorySpy
  }
}

describe('DbChangeEmail', () => {
  let currentEmail: string
  let newEmail: string

  beforeEach(() => {
    currentEmail = faker.internet.email()
    newEmail = faker.internet.email()
  })

  describe('AccountValidation', () => {
    test('Should throw if AccountValidation.validateEmail throws', async() => {
      const { sut } = makeSut()
      jest.spyOn(AccountValidation, 'validateEmail').mockImplementationOnce(throwError)
      const promise = sut.change(currentEmail, newEmail)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('CheckAccountByEmailRepository', () => {
    test('Should call CheckAccountByEmailRepository with correct email', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      await sut.change(currentEmail, newEmail)
      expect(checkAccountByEmailRepositorySpy.email).toBe(currentEmail)
    })

    test('Should throw AccountNotFoundError if CheckAccountByEmailRepository returns false', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      checkAccountByEmailRepositorySpy.output = false
      const promise = sut.change(currentEmail, newEmail)
      await expect(promise).rejects.toThrow(new AccountNotFoundError())
    })

    test('Should throw if CheckAccountByEmailRepository throws', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      jest.spyOn(checkAccountByEmailRepositorySpy, 'checkByEmail').mockImplementationOnce(throwError)
      const promise = sut.change(currentEmail, newEmail)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('ChangeEmailRepository', () => {
    test('Should call ChangeEmailRepository with correct values', async() => {
      const { sut, changeEmailRepositorySpy } = makeSut()
      await sut.change(currentEmail, newEmail)
      expect(changeEmailRepositorySpy.currentEmail).toBe(currentEmail)
      expect(changeEmailRepositorySpy.newEmail).toBe(newEmail)
    })

    test('Should throw if ChangeEmailRepository throws', async() => {
      const { sut, changeEmailRepositorySpy } = makeSut()
      jest.spyOn(changeEmailRepositorySpy, 'change').mockImplementationOnce(throwError)
      const promise = sut.change(currentEmail, newEmail)
      await expect(promise).rejects.toThrow()
    })

    test('Should not throw on success', async() => {
      const { sut } = makeSut()
      const promise = sut.change(currentEmail, newEmail)
      await expect(promise).resolves.not.toThrow()
    })
  })
})
