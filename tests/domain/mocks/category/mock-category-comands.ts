import { faker } from '@faker-js/faker'

import { type AddCategory, type UpdateCategory } from '@/domain/usecases/category/commands'
import { CategoryHelper } from '@/domain/entities/category'

export const mockAddCategoryInput = (): AddCategory.Input => ({
  name: faker.string.alpha({ length: { min: 3, max: 20 } })
})

export const mockUpdateCategoryInput = (): UpdateCategory.Input => ({
  id: faker.string.uuid(),
  name: CategoryHelper.formatName(faker.string.alpha({ length: { min: 3, max: 20 } }))
})
