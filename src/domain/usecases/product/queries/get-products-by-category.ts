import { type ProductsOutput } from '@/domain/entities/product/dto'

export interface GetProductsByCategory {
  getByCategory: (category: string, page: number, limit: number) => Promise<ProductsOutput>
}
