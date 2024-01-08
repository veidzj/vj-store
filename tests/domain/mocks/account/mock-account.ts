import { faker } from '@faker-js/faker'

import { Account, AccountValidation } from '@/domain/entities/account'
import { type AddAccount, type Authentication } from '@/domain/usecases/account/commands'

export const mockAccount = (): Account => {
  const username = faker.string.alpha({ length: { min: 3, max: 12 } })
  const email = faker.internet.email()
  const password = faker.internet.password()
  return new Account(username, email, password)
}

export const mockAddAccountInput = (): AddAccount.Input => ({
  username: AccountValidation.formatUsername(faker.string.alpha({ length: { min: 3, max: 12 } })),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationInput = (): Authentication.Input => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
