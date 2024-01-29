import { type ProductOutput } from '@/domain/entities/product/dto'

export interface GetProductsByCategory {
  getByCategory: (page: number, limit: number) => Promise<GetProductsByCategory.Output>
}

export namespace GetProductsByCategory {
  export interface Output {
    products: ProductOutput[]
    currentPage: number
    totalPages: number
    totalItems: number
  }
}
