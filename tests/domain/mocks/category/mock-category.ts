import { faker } from '@faker-js/faker'

import { type AddCategory } from '@/domain/usecases/category'

export const mockAddCategoryInput = (): AddCategory.Input => {
  const randomString = faker.string.alpha({ length: { min: 4, max: 19 }, casing: 'lower' })
  return {
    name: faker.string.alpha({ length: 1, casing: 'upper' }) + randomString
  }
}
