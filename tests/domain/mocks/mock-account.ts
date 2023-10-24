import { faker } from '@faker-js/faker'
import { type AddAccount } from '../../../src/domain/usecases/add-account'
import { type Authentication } from '../../../src/domain/usecases/authentication'

export const mockAddAccountInput = (): AddAccount.Input => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationInput = (): Authentication.Input => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
