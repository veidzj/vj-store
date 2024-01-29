import { type GetProductsWithDiscount } from '@/domain/usecases/product/queries'

export interface GetProductsWithDiscountRepository {
  getWithDiscount: (page: number, limit: number) => Promise<GetProductsWithDiscountRepository.Output>
}

export namespace GetProductsWithDiscountRepository {
  export type Output = GetProductsWithDiscount.Output
}
