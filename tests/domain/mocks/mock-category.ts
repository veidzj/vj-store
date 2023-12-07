import { faker } from '@faker-js/faker'

import { type AddCategory } from '@/domain/usecases/dynamic/category'
import { type Category } from '@/domain/models'

export const mockAddCategoryInput = (): AddCategory.Input => ({
  name: faker.word.words(),
  addedAt: faker.date.recent()
})

export const mockCategory = (): Category => ({
  id: faker.string.uuid(),
  name: faker.word.words()
})

export const mockCategories = (): Category[] => [
  mockCategory(),
  mockCategory()
]
