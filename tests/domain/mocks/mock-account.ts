import { faker } from '@faker-js/faker'
import { type AddAccount } from '../../../src/domain/usecases/add-account'

export const mockAddAccountInput = (): AddAccount.Input => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})
