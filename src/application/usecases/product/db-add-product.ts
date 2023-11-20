import { type AddProductRepository } from '@/application/protocols/db/dynamic/product'
import { type AddProduct } from '@/domain/usecases/product'

export class DbAddProduct implements AddProduct {
  constructor(private readonly addProductRepository: AddProductRepository) {}

  public add = async(input: AddProduct.Input): Promise<void> => {
    const slug = this.generateSlug(input.name)
    const product = { ...input, slug }
    await this.addProductRepository.add(product)
  }

  private readonly generateSlug = (value: string): string => {
    return value.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
  }
}
