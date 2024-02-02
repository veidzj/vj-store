import { type ProductsOutput } from '@/domain/dtos/product'

export interface GetLatestProducts {
  getLatest: (page: number, limit: number) => Promise<ProductsOutput>
}
