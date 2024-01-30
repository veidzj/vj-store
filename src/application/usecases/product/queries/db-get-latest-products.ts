import { type GetLatestProductsRepository } from '@/application/protocols/product/queries'
import { type GetLatestProducts } from '@/domain/usecases/product/queries'
import { type ProductsOutput } from '@/domain/usecases/product/common'

export class DbGetLatestProducts implements GetLatestProducts {
  constructor(private readonly getLatestProductsRepository: GetLatestProductsRepository) {}

  public async getLatest(page: number, limit: number): Promise<ProductsOutput> {
    const { products, currentPage, totalPages, totalItems } = await this.getLatestProductsRepository.getLatest(page, limit)
    return {
      products,
      currentPage,
      totalPages,
      totalItems
    }
  }
}
