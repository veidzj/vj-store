import { faker } from '@faker-js/faker'

import { DbChangeAccountPassword } from '@/application/usecases/account/commands'
import { CheckAccountByEmailRepositorySpy } from '@/tests/application/mocks/account/queries'

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
    const sut = new DbChangeAccountPassword(checkAccountByEmailRepositorySpy)
    await sut.changePassword(accountEmail, currentPassword, newPassword)
    expect(checkAccountByEmailRepositorySpy.email).toBe(accountEmail)
  })
})
