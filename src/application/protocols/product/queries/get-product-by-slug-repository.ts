import { type ProductRepositoryOutput } from '@/application/dtos/product'

export interface GetProductBySlugRepository {
  getBySlug: (slug: string) => Promise<ProductRepositoryOutput>
}
