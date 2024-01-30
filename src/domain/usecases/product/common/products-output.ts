import { type ProductOutput } from '@/domain/entities/product/dto'

export interface ProductsOutput {
  products: ProductOutput[]
  currentPage: number
  totalPages: number
  totalItems: number
}
