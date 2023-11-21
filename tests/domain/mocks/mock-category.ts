import { faker } from '@faker-js/faker'
import { type AddCategory } from '@/domain/usecases/category'

export const mockAddCategoryInput = (): AddCategory.Input => ({
  name: faker.word.words()
})
