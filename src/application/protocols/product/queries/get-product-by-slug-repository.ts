import { type ProductOutput } from '@/domain/entities/product/dto'

export interface GetProductBySlugRepository {
  getBySlug: (slug: string) => Promise<ProductOutput>
}
