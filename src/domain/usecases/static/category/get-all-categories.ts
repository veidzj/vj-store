import { type Category } from '@/domain/models'

export interface GetAllCategories {
  getAll: () => Promise<Category[]>
}
