import { type ProductsRepositoryOutput } from '@/application/dtos/product'

export interface GetLatestProductsRepository {
  getLatest: (page: number, limit: number) => Promise<ProductsRepositoryOutput>
}
