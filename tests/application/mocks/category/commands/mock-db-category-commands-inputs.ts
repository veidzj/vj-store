import { faker } from '@faker-js/faker'

import { type AddCategoryRepository, type UpdateCategoryRepository } from '@/application/protocols/category/commands'
import { CategoryHelper, CategoryFields } from '@/domain/entities/category'

export const mockAddCategoryRepositoryInput = (): AddCategoryRepository.Input => ({
  id: faker.string.uuid(),
  name: CategoryHelper.formatName(faker.string.alpha({ length: { min: 3, max: 20 } })),
  createdAt: faker.date.anytime(),
  updateHistory: []
})

export const mockUpdateCategoryRepositoryInput = (): UpdateCategoryRepository.Input => ({
  id: faker.string.uuid(),
  name: CategoryHelper.formatName(faker.string.alpha({ length: { min: 3, max: 20 } })),
  updateHistory: {
    fields: [CategoryFields.name],
    updatedAt: new Date()
  }
})
