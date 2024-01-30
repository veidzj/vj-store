import { type GetProductsByCategoryRepository } from '@/application/protocols/product/queries'
import { type GetProductsByCategory } from '@/domain/usecases/product/queries'

export class DbGetProductsByCategory implements GetProductsByCategory {
  constructor(private readonly getProductsByCategoryRepository: GetProductsByCategoryRepository) {}

  public async getByCategory(category: string, page: number, limit: number): Promise<GetProductsByCategory.Output> {
    const { products, currentPage, totalPages, totalItems } = await this.getProductsByCategoryRepository.getByCategory(category, page, limit)
    return {
      products,
      currentPage,
      totalPages,
      totalItems
    }
  }
}
