import { faker } from '@faker-js/faker'

import { type AddCategoryRepository } from '@/application/protocols/category/commands'

export const mockAddCategoryRepositoryInput = (): AddCategoryRepository.Input => ({
  id: faker.string.uuid(),
  name: faker.string.alpha({ length: 1, casing: 'upper' }) + faker.string.alpha({ length: { min: 4, max: 19 }, casing: 'lower' }),
  createdAt: faker.date.anytime(),
  updateHistory: []
})
