import { faker } from '@faker-js/faker'

import { type AddAccountRepository, type UpdateAccessTokenRepository } from '@/application/protocols/account/commands'

export const mockAddAccountRepositoryInput = (): AddAccountRepository.Input => ({
  id: faker.string.uuid(),
  username: faker.string.alpha({ length: { min: 3, max: 12 }, casing: 'lower' }),
  email: faker.internet.email(),
  password: faker.internet.password(),
  role: faker.word.words(),
  isActive: faker.datatype.boolean(),
  createdAt: faker.date.anytime(),
  updateHistory: []
})

export const mockUpdateAccessTokenInput = (): UpdateAccessTokenRepository.Input => ({
  id: faker.string.uuid(),
  accessToken: faker.string.uuid()
})
