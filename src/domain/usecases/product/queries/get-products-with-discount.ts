import { type ProductsOutput } from '@/domain/entities/product/dto'

export interface GetProductsWithDiscount {
  getWithDiscount: (page: number, limit: number) => Promise<ProductsOutput>
}
