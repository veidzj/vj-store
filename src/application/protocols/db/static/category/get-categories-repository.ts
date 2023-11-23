import { type Category } from '@/domain/models'

export interface GetCategoriesRepository {
  get: () => Promise<GetCategoriesRepository.Output>
}

export namespace GetCategoriesRepository {
  export type Output = Category[]
}
