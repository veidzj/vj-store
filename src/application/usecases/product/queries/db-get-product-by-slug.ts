import { type CheckProductBySlugRepository } from '@/application/protocols/product/queries'
import { ProductNotFoundError } from '@/domain/errors/product'

export class DbGetProductBySlug {
  constructor(
    private readonly checkProductBySlugRepository: CheckProductBySlugRepository
  ) {}

  public async getBySlug(slug: string): Promise<void> {
    const productExists = await this.checkProductBySlugRepository.checkBySlug(slug)
    if (!productExists) {
      throw new ProductNotFoundError()
    }
  }
}
