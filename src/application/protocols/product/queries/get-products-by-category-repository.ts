import { type GetProductsByCategory } from '@/domain/usecases/product/queries'

export interface GetProductsByCategoryRepository {
  getByCategory: (page: number, limit: number) => Promise<GetProductsByCategoryRepository.Output>
}

export namespace GetProductsByCategoryRepository {
  export type Output = GetProductsByCategory.Output
}
