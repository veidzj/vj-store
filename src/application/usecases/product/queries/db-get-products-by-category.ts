import { type CheckCategoryByNameRepository } from '@/application/protocols/category/queries'
import { type GetProductsByCategoryRepository } from '@/application/protocols/product/queries'
import { type GetProductsByCategory } from '@/domain/usecases/product/queries'
import { type ProductsOutput } from '@/domain/entities/product/dto'

export class DbGetProductsByCategory implements GetProductsByCategory {
  constructor(
    private readonly checkCategoryByNameRepository: CheckCategoryByNameRepository,
    private readonly getProductsByCategoryRepository: GetProductsByCategoryRepository
  ) {}

  public async getByCategory(category: string, page: number, limit: number): Promise<ProductsOutput> {
    await this.checkCategoryByNameRepository.checkByName(category)
    const { products, currentPage, totalPages, totalItems } = await this.getProductsByCategoryRepository.getByCategory(category, page, limit)
    return {
      products,
      currentPage,
      totalPages,
      totalItems
    }
  }
}
