import { faker } from '@faker-js/faker'

import { type AddAccount, type Authentication } from '@/domain/usecases/auth'

export const mockAddAccountInput = (): AddAccount.Input => ({
  username: faker.person.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationInput = (): Authentication.Input => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
