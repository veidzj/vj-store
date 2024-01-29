import { type ProductOutput } from '@/domain/entities/product/dto'

export interface GetProductsWithDiscount {
  getWithDiscount: (page: number, limit: number) => Promise<GetProductsWithDiscount.Output>
}

export namespace GetProductsWithDiscount {
  export interface Output {
    products: ProductOutput[]
    currentPage: number
    totalPages: number
    totalItems: number
  }
}
