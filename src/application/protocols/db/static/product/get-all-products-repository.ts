import { type Product } from '@/domain/models'

export interface GetAllProductsRepository {
  getAll: (page?: number, limit?: number) => Promise<GetAllProductsRepository.Output>
}

export namespace GetAllProductsRepository {
  export type Output = Product[]
}
