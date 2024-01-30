import { type ProductsRepositoryOutput } from '@/application/protocols/product/common'

export interface GetProductsByCategoryRepository {
  getByCategory: (category: string, page: number, limit: number) => Promise<ProductsRepositoryOutput>
}
