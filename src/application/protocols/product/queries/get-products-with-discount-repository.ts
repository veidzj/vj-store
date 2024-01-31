import { type ProductsRepositoryOutput } from '@/application/dtos/product'

export interface GetProductsWithDiscountRepository {
  getWithDiscount: (page: number, limit: number) => Promise<ProductsRepositoryOutput>
}
