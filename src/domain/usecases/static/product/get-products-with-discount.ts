import { type Product } from '@/domain/models'

export interface GetProductsWithDiscount {
  getWithDiscount: (page: number, limit: number) => Promise<Product[]>
}
