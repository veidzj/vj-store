import { type Category } from '@/domain/models'

export interface GetCategories {
  get: () => Promise<Category[]>
}
