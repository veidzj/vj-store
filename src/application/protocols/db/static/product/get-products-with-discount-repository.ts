import { type Product } from '@/domain/models'

export interface GetProductsWithDiscountRepository {
  getWithDiscount: (page: number, limit: number) => Promise<GetProductsWithDiscountRepository.Output>
}

export namespace GetProductsWithDiscountRepository {
  export type Output = Product[]
}
