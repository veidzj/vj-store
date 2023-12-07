import { type Category } from '@/domain/models'

export interface GetAllCategoriesRepository {
  getAll: () => Promise<GetAllCategoriesRepository.Output>
}

export namespace GetAllCategoriesRepository {
  export type Output = Category[]
}
