import { type CheckCategoryByNameRepository } from '@/application/protocols/category/queries'
import { type AddProduct } from '@/domain/usecases/product/commands'

export class DbAddProduct implements AddProduct {
  constructor(private readonly checkCategoryByNameRepository: CheckCategoryByNameRepository) {}

  public async add(input: AddProduct.Input): Promise<void> {
    await this.checkCategoryByNameRepository.checkByName(input.category)
  }
}
