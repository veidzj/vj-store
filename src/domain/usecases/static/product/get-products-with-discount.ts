import { type Product } from '@/domain/models'

export interface GetProductsWithDiscount {
  getWithDiscount: () => Promise<Product[]>
}
