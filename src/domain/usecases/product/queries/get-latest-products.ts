import { type ProductsOutput } from '@/domain/entities/product/dto'

export interface GetLatestProducts {
  getLatest: (page: number, limit: number) => Promise<ProductsOutput>
}
