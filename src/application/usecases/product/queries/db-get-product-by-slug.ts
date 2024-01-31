import { type CheckProductBySlugRepository, type GetProductBySlugRepository } from '@/application/protocols/product/queries'
import { ProductNotFoundError } from '@/domain/errors/product'

export class DbGetProductBySlug {
  constructor(
    private readonly checkProductBySlugRepository: CheckProductBySlugRepository,
    private readonly getProductBySlugRepository: GetProductBySlugRepository
  ) {}

  public async getBySlug(slug: string): Promise<void> {
    const productExists = await this.checkProductBySlugRepository.checkBySlug(slug)
    if (!productExists) {
      throw new ProductNotFoundError()
    }
    await this.getProductBySlugRepository.getBySlug(slug)
  }
}
