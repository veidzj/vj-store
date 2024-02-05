import { faker } from '@faker-js/faker'

import { AccountHelper } from '@/domain/entities/account'
import { type AddAccount, type Authentication } from '@/domain/usecases/account/commands'

export const mockAddAccountInput = (): AddAccount.Input => ({
  username: AccountHelper.formatUsername(faker.string.alpha({ length: { min: 3, max: 12 } })),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationInput = (): Authentication.Input => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
