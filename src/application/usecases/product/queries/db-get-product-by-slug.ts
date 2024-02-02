import { type GetProductBySlugRepository } from '@/application/protocols/product/queries'
import { type ProductOutput } from '@/domain/dtos/product'
import { type GetProductBySlug } from '@/domain/usecases/product/queries'
import { ProductNotFoundError } from '@/domain/errors/product'

export class DbGetProductBySlug implements GetProductBySlug {
  constructor(private readonly getProductBySlugRepository: GetProductBySlugRepository) {}

  public async getBySlug(slug: string): Promise<ProductOutput> {
    const product = await this.getProductBySlugRepository.getBySlug(slug)
    if (!product) {
      throw new ProductNotFoundError()
    }
    return product
  }
}
