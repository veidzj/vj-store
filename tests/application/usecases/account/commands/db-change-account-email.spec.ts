import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { CheckAccountByEmailRepositorySpy } from '@/tests/application/mocks/account/queries'
import { ChangeAccountEmailRepositorySpy } from '@/tests/application/mocks/account/commands'
import { DbChangeAccountEmail } from '@/application/usecases/account/commands'
import { AccountValidation } from '@/domain/entities/account'
import { AccountNotFoundError } from '@/domain/errors/account'

interface Sut {
  sut: DbChangeAccountEmail
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
  changeAccountEmailRepositorySpy: ChangeAccountEmailRepositorySpy
}

const makeSut = (): Sut => {
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  checkAccountByEmailRepositorySpy.output = true
  const changeAccountEmailRepositorySpy = new ChangeAccountEmailRepositorySpy()
  const sut = new DbChangeAccountEmail(checkAccountByEmailRepositorySpy, changeAccountEmailRepositorySpy)
  return {
    sut,
    checkAccountByEmailRepositorySpy,
    changeAccountEmailRepositorySpy
  }
}

describe('DbChangeAccountEmail', () => {
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
      const promise = sut.changeEmail(currentEmail, newEmail)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('CheckAccountByEmailRepository', () => {
    test('Should call CheckAccountByEmailRepository with correct email', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      await sut.changeEmail(currentEmail, newEmail)
      expect(checkAccountByEmailRepositorySpy.email).toBe(currentEmail)
    })

    test('Should throw AccountNotFoundError if CheckAccountByEmailRepository returns false', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      checkAccountByEmailRepositorySpy.output = false
      const promise = sut.changeEmail(currentEmail, newEmail)
      await expect(promise).rejects.toThrow(new AccountNotFoundError())
    })

    test('Should throw if CheckAccountByEmailRepository throws', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      jest.spyOn(checkAccountByEmailRepositorySpy, 'checkByEmail').mockImplementationOnce(throwError)
      const promise = sut.changeEmail(currentEmail, newEmail)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('ChangeAccountEmailRepository', () => {
    test('Should call ChangeAccountEmailRepository with correct values', async() => {
      const { sut, changeAccountEmailRepositorySpy } = makeSut()
      await sut.changeEmail(currentEmail, newEmail)
      expect(changeAccountEmailRepositorySpy.currentEmail).toBe(currentEmail)
      expect(changeAccountEmailRepositorySpy.newEmail).toBe(newEmail)
    })

    test('Should throw if ChangeAccountEmailRepository throws', async() => {
      const { sut, changeAccountEmailRepositorySpy } = makeSut()
      jest.spyOn(changeAccountEmailRepositorySpy, 'changeEmail').mockImplementationOnce(throwError)
      const promise = sut.changeEmail(currentEmail, newEmail)
      await expect(promise).rejects.toThrow()
    })

    test('Should not throw on success', async() => {
      const { sut } = makeSut()
      const promise = sut.changeEmail(currentEmail, newEmail)
      await expect(promise).resolves.not.toThrow()
    })
  })
})
