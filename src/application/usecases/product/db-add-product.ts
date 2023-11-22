import { ProductHelper } from '@/application/helpers/product-helper'
import { type AddProductRepository } from '@/application/protocols/db/dynamic/product'
import { type AddProduct } from '@/domain/usecases/product'

export class DbAddProduct implements AddProduct {
  constructor(private readonly addProductRepository: AddProductRepository) {}

  public add = async(input: AddProduct.Input): Promise<void> => {
    const slug = ProductHelper.generateSlug(input.name)
    const product = { ...input, slug }
    await this.addProductRepository.add(product)
  }
}
