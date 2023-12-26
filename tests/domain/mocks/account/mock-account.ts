import { faker } from '@faker-js/faker'

import { type AddAccount } from '@/domain/usecases/account'

export const mockAddAccountInput = (): AddAccount.Input => ({
  Username: faker.string.alpha({ length: { min: 3, max: 12 }, casing: 'lower' }),
  Email: faker.internet.email(),
  Password: faker.internet.password()
})
