import { type GetLatestProductsRepository } from '@/application/protocols/product/queries'
import { type GetLatestProducts } from '@/domain/usecases/product/queries'

export class DbGetLatestProducts implements GetLatestProducts {
  constructor(private readonly getLatestProductsRepository: GetLatestProductsRepository) {}

  public async getLatest(page: number, limit: number): Promise<GetLatestProducts.Output> {
    await this.getLatestProductsRepository.getLatest(page, limit)
    return {
      products: [],
      currentPage: 0,
      totalPages: 0,
      totalItems: 0
    }
  }
}
