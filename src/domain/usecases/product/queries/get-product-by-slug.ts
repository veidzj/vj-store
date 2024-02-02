import { type ProductOutput } from '@/domain/dtos/product'

export interface GetProductBySlug {
  getBySlug: (slug: string) => Promise<ProductOutput>
}
