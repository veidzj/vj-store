import { type AddProductRepository } from '@/application/protocols/db/dynamic/product'
import { type AddProduct } from '@/domain/usecases/product'

export class DbAddProduct implements AddProduct {
  constructor(private readonly addProductRepository: AddProductRepository) {}

  public add = async(input: AddProduct.Input): Promise<void> => {
    await this.addProductRepository.add(input)
  }
}
