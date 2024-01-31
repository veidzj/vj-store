import { type ProductOutput } from '@/domain/dtos/product'

export interface ProductsRepositoryOutput {
  products: ProductOutput[]
  currentPage: number
  totalPages: number
  totalItems: number
}
