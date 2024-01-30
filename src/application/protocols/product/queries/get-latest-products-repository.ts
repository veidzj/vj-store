import { type ProductsRepositoryOutput } from '@/application/protocols/product/common'

export interface GetLatestProductsRepository {
  getLatest: (page: number, limit: number) => Promise<ProductsRepositoryOutput>
}
