import { type GetLatestProducts } from '@/domain/usecases/product/queries'

export interface GetLatestProductsRepository {
  getLatest: (page: number, limit: number) => Promise<GetLatestProductsRepository.Output>
}

export namespace GetLatestProductsRepository {
  export type Output = GetLatestProducts.Output
}
