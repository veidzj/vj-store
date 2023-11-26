import { type Product } from '@/domain/models'

export interface GetProductBySlugRepository {
  getBySlug: (slug: string) => Promise<GetProductBySlugRepository.Output | null>
}

export namespace GetProductBySlugRepository {
  export type Output = Product
}
