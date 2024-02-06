import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { CheckAccountByEmailRepositorySpy } from '@/tests/application/mocks/account/queries'
import { DbChangeAccountPassword } from '@/application/usecases/account/commands'
import { AccountNotFoundError } from '@/domain/errors/account'

interface Sut {
  sut: DbChangeAccountPassword
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
}

const makeSut = (): Sut => {
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  checkAccountByEmailRepositorySpy.output = true
  const sut = new DbChangeAccountPassword(checkAccountByEmailRepositorySpy)
  return {
    sut,
    checkAccountByEmailRepositorySpy
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
