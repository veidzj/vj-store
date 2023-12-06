import { type Product } from '@/domain/models'

export interface GetLatestProductsRepository {
  getLatest: (page: number, limit: number) => Promise<GetLatestProductsRepository.Output>
}

export namespace GetLatestProductsRepository {
  export type Output = Product[]
}
