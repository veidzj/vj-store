import { type CheckCategoryByNameRepository } from '@/application/protocols/category/queries'
import { type GetProductsByCategoryRepository } from '@/application/protocols/product/queries'
import { type GetProductsByCategory } from '@/domain/usecases/product/queries'
import { type ProductsOutput } from '@/domain/dtos/product'
import { CategoryNotFoundError } from '@/domain/errors/category'

export class DbGetProductsByCategory implements GetProductsByCategory {
  constructor(
    private readonly checkCategoryByNameRepository: CheckCategoryByNameRepository,
    private readonly getProductsByCategoryRepository: GetProductsByCategoryRepository
  ) {}

  public async getByCategory(category: string, page: number, limit: number): Promise<ProductsOutput> {
    const categoryExists = await this.checkCategoryByNameRepository.checkByName(category)
    if (!categoryExists) {
      throw new CategoryNotFoundError()
    }
    const { products, currentPage, totalPages, totalItems } = await this.getProductsByCategoryRepository.getByCategory(category, page, limit)
    return {
      products,
      currentPage,
      totalPages,
      totalItems
    }
  }
}
