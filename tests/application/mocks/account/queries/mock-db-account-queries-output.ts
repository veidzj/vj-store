import { faker } from '@faker-js/faker'

import { type GetAccountByEmailRepository } from '@/application/protocols/account/queries'

export const mockGetAccountByEmailRepositoryOutput = (): GetAccountByEmailRepository.Output => ({
  id: faker.string.uuid(),
  password: faker.internet.password()
})
