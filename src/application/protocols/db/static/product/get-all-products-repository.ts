import { type Product } from '@/domain/models'

export interface GetAllProductsRepository {
  getAll: () => Promise<GetAllProductsRepository.Output>
}

export namespace GetAllProductsRepository {
  export type Output = Product[]
}
