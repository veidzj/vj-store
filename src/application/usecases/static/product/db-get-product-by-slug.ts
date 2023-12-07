import { type GetProductBySlugRepository } from '@/application/protocols/db/static/product'
import { ProductNotFoundError } from '@/application/errors/product'
import { type GetProductBySlug } from '@/domain/usecases/static/product'
import { type Product } from '@/domain/models'

export class DbGetProductBySlug implements GetProductBySlug {
  constructor(private readonly getProductBySlugRepository: GetProductBySlugRepository) {}

  public getBySlug = async(slug: string): Promise<Product> => {
    const product = await this.getProductBySlugRepository.getBySlug(slug)
    if (!product) {
      throw new ProductNotFoundError()
    }
    return product
  }
}
