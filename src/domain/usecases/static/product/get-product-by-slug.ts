import { type Product } from '@/domain/models'

export interface GetProductBySlug {
  getBySlug: (slug: string) => Promise<Product>
}
