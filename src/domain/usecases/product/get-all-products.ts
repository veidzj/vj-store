import { type Product } from '@/domain/models'

export interface GetAllProducts {
  getAll: () => Promise<Product[]>
}
