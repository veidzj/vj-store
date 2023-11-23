import { type Category } from '@/domain/models'

export interface GetCategoriesRepository {
  get: () => Promise<Category[]>
}
