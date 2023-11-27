import { type GetProductsByCategoryRepository } from '@/application/protocols/db/static/product'
import { type CheckCategoryByNameRepository } from '@/application/protocols/db/static/category'
import { CategoryNotFoundError } from '@/application/errors/category'
import { type Product } from '@/domain/models'
import { type GetProductsByCategory } from '@/domain/usecases/product'

export class DbGetProductsByCategory implements GetProductsByCategory {
  constructor(
    private readonly checkCategoryByNameRepository: CheckCategoryByNameRepository,
    private readonly getProductsByCategoryRepository: GetProductsByCategoryRepository
  ) {}

  public getByCategory = async(category: string): Promise<Product[]> => {
    const categoryExists = await this.checkCategoryByNameRepository.checkByName(category)
    if (!categoryExists) {
      throw new CategoryNotFoundError()
    }
    const products = await this.getProductsByCategoryRepository.getByCategory(category)
    return products
  }
}