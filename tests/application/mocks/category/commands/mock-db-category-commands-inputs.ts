import { faker } from '@faker-js/faker'

import { type AddCategoryRepository, type UpdateCategoryRepository } from '@/application/protocols/category/commands'
import { CategoryHelper } from '@/domain/entities/category'

export const mockAddCategoryRepositoryInput = (): AddCategoryRepository.Input => ({
  id: faker.string.uuid(),
  name: CategoryHelper.formatName(faker.string.alpha({ length: { min: 3, max: 20 } })),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime()
})

export const mockUpdateCategoryRepositoryInput = (): UpdateCategoryRepository.Input => ({
  id: faker.string.uuid(),
  name: CategoryHelper.formatName(faker.string.alpha({ length: { min: 3, max: 20 } })),
  updatedAt: faker.date.anytime()
})
