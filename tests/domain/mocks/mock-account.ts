import { faker } from '@faker-js/faker'
import { type AddAccount } from '@/domain/usecases/authentication/add-account'
import { type Authentication } from '@/domain/usecases/authentication/authentication'

export const mockAddAccountInput = (): AddAccount.Input => ({
  username: faker.person.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationInput = (): Authentication.Input => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
