import { faker } from '@faker-js/faker'

import { type AddAccount } from '@/domain/usecases/dynamic/auth'
import { type Authentication } from '@/domain/usecases/static/auth'

export const mockAddAccountInput = (): AddAccount.Input => ({
  username: faker.person.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  addedAt: faker.date.recent()
})

export const mockAuthenticationInput = (): Authentication.Input => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
