import { type ProductsRepositoryOutput } from '@/application/dtos/product'

export interface GetProductsByCategoryRepository {
  getByCategory: (category: string, page: number, limit: number) => Promise<ProductsRepositoryOutput>
}
