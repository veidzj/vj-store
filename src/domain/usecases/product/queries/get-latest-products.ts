import { type ProductsOutput } from '@/domain/usecases/product/common'

export interface GetLatestProducts {
  getLatest: (page: number, limit: number) => Promise<ProductsOutput>
}
