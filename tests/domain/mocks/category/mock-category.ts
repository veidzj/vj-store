import { faker } from '@faker-js/faker'

import { type AddCategory } from '@/domain/usecases/category/commands'

export const mockAddCategoryInput = (): AddCategory.Input => ({
  name: faker.string.alpha({ length: { min: 3, max: 20 } })
})
