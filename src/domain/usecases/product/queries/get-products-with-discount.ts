import { type ProductsOutput } from '@/domain/usecases/product/common'

export interface GetProductsWithDiscount {
  getWithDiscount: (page: number, limit: number) => Promise<ProductsOutput>
}
