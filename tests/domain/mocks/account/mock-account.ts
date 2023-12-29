import { faker } from '@faker-js/faker'

import { type AddAccount } from '@/domain/usecases/account'
import { Account } from '@/domain/entities/account'

export const mockAddAccountInput = (): AddAccount.Input => ({
  username: faker.string.alpha({ length: { min: 3, max: 12 }, casing: 'lower' }),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccount = (): Account => {
  const username = faker.string.alpha({ length: { min: 3, max: 12 }, casing: 'lower' })
  const email = faker.internet.email()
  const password = faker.internet.password()
  return new Account(username, email, password)
}
