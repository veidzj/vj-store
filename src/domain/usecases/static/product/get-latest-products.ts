import { type Product } from '@/domain/models'

export interface GetLatestProducts {
  getLatest: (page: number, limit: number) => Promise<Product[]>
}
