import { type ProductOutput } from '@/domain/entities/product/dto'

export interface GetLatestProducts {
  getLatest: (page: number, limit: number) => Promise<GetLatestProducts.Output>
}

export namespace GetLatestProducts {
  export interface Output {
    products: ProductOutput[]
    currentPage: number
    totalPages: number
    totalItems: number
  }
}
