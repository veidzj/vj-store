import { faker } from '@faker-js/faker'

import { CheckAccountByEmailRepositorySpy } from '@/tests/application/mocks/account/queries'
import { DbChangeAccountPassword } from '@/application/usecases/account/commands'
import { AccountNotFoundError } from '@/domain/errors/account'

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
    const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
    checkAccountByEmailRepositorySpy.output = true
    const sut = new DbChangeAccountPassword(checkAccountByEmailRepositorySpy)
    await sut.changePassword(accountEmail, currentPassword, newPassword)
    expect(checkAccountByEmailRepositorySpy.email).toBe(accountEmail)
  })

  test('Should throw AccountNotFoundError if CheckAccountByEmailRepository returns false', async() => {
    const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
    checkAccountByEmailRepositorySpy.output = false
    const sut = new DbChangeAccountPassword(checkAccountByEmailRepositorySpy)
    const promise = sut.changePassword(accountEmail, currentPassword, newPassword)
    await expect(promise).rejects.toThrow(new AccountNotFoundError())
  })
})
