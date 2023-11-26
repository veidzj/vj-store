import { type Product } from '@/domain/models'

export interface GetAllProducts {
  getAll: (page?: number, limit?: number) => Promise<Product[]>
}
