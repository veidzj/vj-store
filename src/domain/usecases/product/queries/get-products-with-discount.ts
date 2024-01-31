import { type ProductsOutput } from '@/domain/dtos/product'

export interface GetProductsWithDiscount {
  getWithDiscount: (page: number, limit: number) => Promise<ProductsOutput>
}
