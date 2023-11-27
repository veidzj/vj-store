import { type Product } from '@/domain/models'

export interface GetProductsByCategory {
  getByCategory: (category: string) => Promise<Product[]>
}
