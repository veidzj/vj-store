import { type Product } from '@/domain/entities/product'

export interface GetLatestProducts {
  getLatest: (page: number, limit: number) => Promise<GetLatestProducts.Output>
}

export namespace GetLatestProducts {
  export interface Output {
    products: Product[]
    currentPage: number
    totalPages: number
    totalItems: number
  }
}
