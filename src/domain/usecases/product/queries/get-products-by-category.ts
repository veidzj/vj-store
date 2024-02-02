import { type ProductsOutput } from '@/domain/dtos/product'

export interface GetProductsByCategory {
  getByCategory: (category: string, page: number, limit: number) => Promise<ProductsOutput>
}
