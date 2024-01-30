import { type ProductOutput } from '@/domain/entities/product/dto'

export interface ProductsRepositoryOutput {
  products: ProductOutput[]
  currentPage: number
  totalPages: number
  totalItems: number
}
