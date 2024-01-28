import { type GetProductsWithDiscountRepository } from '@/application/protocols/product/queries'
import { type GetProductsWithDiscount } from '@/domain/usecases/product/queries'

export class DbGetProductsWithDiscount implements GetProductsWithDiscount {
  constructor(private readonly getProductsWithDiscountRepository: GetProductsWithDiscountRepository) {}

  public async getWithDiscount(page: number, limit: number): Promise<GetProductsWithDiscount.Output> {
    const { products, currentPage, totalPages, totalItems } = await this.getProductsWithDiscountRepository.getWithDiscount(page, limit)
    return {
      products,
      currentPage,
      totalPages,
      totalItems
    }
  }
}
