import { type Product } from '@/domain/models'

export interface GetProductsByCategory {
  getByCategory: (category: string, page: number, limit: number) => Promise<Product[]>
}
