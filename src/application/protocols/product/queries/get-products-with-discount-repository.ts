import { type ProductsRepositoryOutput } from '@/application/protocols/product/common'

export interface GetProductsWithDiscountRepository {
  getWithDiscount: (page: number, limit: number) => Promise<ProductsRepositoryOutput>
}
