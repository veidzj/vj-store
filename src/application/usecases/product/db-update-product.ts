import { ProductNotFoundError } from '@/application/errors/product'
import { ProductHelper } from '@/application/helpers/product-helper'
import { type UpdateProductRepository } from '@/application/protocols/db/dynamic/product'
import { type GetProductByIdRepository } from '@/application/protocols/db/static/product'
import { type UpdateProduct } from '@/domain/usecases/product'

export class DbUpdateProduct implements UpdateProduct {
  constructor(
    private readonly getProductByIdRepository: GetProductByIdRepository,
    private readonly updateProductRepository: UpdateProductRepository
  ) {}

  public update = async(input: UpdateProduct.Input): Promise<void> => {
    const productExists = await this.getProductByIdRepository.getById(input.productId)
    if (!productExists) {
      throw new ProductNotFoundError()
    }
    const slug = ProductHelper.generateSlug(input.name)
    const product = { ...input, slug }
    await this.updateProductRepository.update(product)
  }
}
