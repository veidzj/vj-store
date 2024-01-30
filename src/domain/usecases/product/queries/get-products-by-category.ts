import { type ProductsOutput } from '@/domain/usecases/product/common'

export interface GetProductsByCategory {
  getByCategory: (category: string, page: number, limit: number) => Promise<ProductsOutput>
}
