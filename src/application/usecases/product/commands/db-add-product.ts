import { type CheckCategoryByNameRepository } from '@/application/protocols/category/queries'
import { type AddProduct } from '@/domain/usecases/product/commands'
import { CategoryNotFoundError } from '@/domain/errors/category'

export class DbAddProduct implements AddProduct {
  constructor(private readonly checkCategoryByNameRepository: CheckCategoryByNameRepository) {}

  public async add(input: AddProduct.Input): Promise<void> {
    const categoryExists = await this.checkCategoryByNameRepository.checkByName(input.category)
    if (!categoryExists) {
      throw new CategoryNotFoundError()
    }
  }
}
