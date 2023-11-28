import { type Product } from '@/domain/models'

export interface GetProductsByCategoryRepository {
  getByCategory: (category: string, page: number, limit: number) => Promise<GetProductsByCategoryRepository.Output>
}

export namespace GetProductsByCategoryRepository {
  export type Output = Product[]
}
