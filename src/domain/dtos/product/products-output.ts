import { type ProductOutput } from '@/domain/dtos/product'

export interface ProductsOutput {
  products: ProductOutput[]
  currentPage: number
  totalPages: number
  totalItems: number
}
