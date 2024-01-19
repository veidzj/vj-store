import { type CheckProductByIdRepository } from '@/application/protocols/product/queries'
import { type CheckCategoryByNameRepository } from '@/application/protocols/category/queries'
import { type UpdateProduct } from '@/domain/usecases/product/commands'
import { ProductNotFoundError } from '@/domain/errors/product'
import { CategoryNotFoundError } from '@/domain/errors/category'

export class DbUpdateProduct implements UpdateProduct {
  constructor(
    private readonly checkProductByIdRepository: CheckProductByIdRepository,
    private readonly checkCategoryByNameRepository: CheckCategoryByNameRepository
  ) {}

  public async update(input: UpdateProduct.Input): Promise<void> {
    const productExists = await this.checkProductByIdRepository.checkById(input.id)
    if (!productExists) {
      throw new ProductNotFoundError()
    }
    const categoryExists = await this.checkCategoryByNameRepository.checkByName(input.category)
    if (!categoryExists) {
      throw new CategoryNotFoundError()
    }
  }
}
