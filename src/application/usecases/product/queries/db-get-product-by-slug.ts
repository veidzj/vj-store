import { type CheckProductBySlugRepository, type GetProductBySlugRepository } from '@/application/protocols/product/queries'
import { type ProductOutput } from '@/domain/entities/product/dto'
import { type GetProductBySlug } from '@/domain/usecases/product/queries'
import { ProductNotFoundError } from '@/domain/errors/product'

export class DbGetProductBySlug implements GetProductBySlug {
  constructor(
    private readonly checkProductBySlugRepository: CheckProductBySlugRepository,
    private readonly getProductBySlugRepository: GetProductBySlugRepository
  ) {}

  public async getBySlug(slug: string): Promise<ProductOutput> {
    const productExists = await this.checkProductBySlugRepository.checkBySlug(slug)
    if (!productExists) {
      throw new ProductNotFoundError()
    }
    const product = await this.getProductBySlugRepository.getBySlug(slug)
    return product
  }
}
