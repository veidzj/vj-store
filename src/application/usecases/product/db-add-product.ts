import { type AddProductRepository } from '@/application/protocols/db/dynamic/product/add-product-repository'
import { type AddProduct } from '@/domain/usecases/product/add-product'

export class DbAddProduct implements AddProduct {
  constructor(private readonly addProductRepository: AddProductRepository) {}

  public add = async(input: AddProduct.Input): Promise<void> => {
    await this.addProductRepository.add(input)
  }
}
