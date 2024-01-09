import { faker } from '@faker-js/faker'

import { type AddCategory } from '@/domain/usecases/category/commands'
import { type GetAllCategories } from '@/domain/usecases/category/queries'
import { CategoryValidation } from '@/domain/entities/category'

export const mockAddCategoryInput = (): AddCategory.Input => ({
  name: faker.string.alpha({ length: { min: 3, max: 20 } })
})

export const mockCategory = (): GetAllCategories.Output => ({
  id: faker.string.uuid(),
  name: CategoryValidation.formatName(faker.string.alpha({ length: { min: 3, max: 20 } }))
})

export const mockCategories = (): GetAllCategories.Output[] => [
  mockCategory(),
  mockCategory()
]
