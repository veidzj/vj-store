import { ProductHelper } from '@/application/helpers/product-helper'
import { type CheckCategoryByNameRepository } from '@/application/protocols/db/static/category'
import { type AddProductRepository } from '@/application/protocols/db/dynamic/product'
import { CategoryNotFoundError } from '@/application/errors/category'
import { type AddProduct } from '@/domain/usecases/dynamic/product'

export class DbAddProduct implements AddProduct {
  constructor(
    private readonly checkCategoryByNameRepository: CheckCategoryByNameRepository,
    private readonly addProductRepository: AddProductRepository
  ) {}

  public add = async(input: AddProduct.Input): Promise<void> => {
    const categoryExists = await this.checkCategoryByNameRepository.checkByName(input.category)
    if (!categoryExists) {
      throw new CategoryNotFoundError()
    }
    const slug = ProductHelper.generateSlug(input.name)
    const product = { ...input, slug }
    await this.addProductRepository.add(product)
  }
}
