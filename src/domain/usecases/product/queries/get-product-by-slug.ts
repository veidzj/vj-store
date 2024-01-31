import { type ProductOutput } from '@/domain/entities/product/dto'

export interface GetProductBySlug {
  getBySlug: (slug: string) => Promise<ProductOutput>
}
