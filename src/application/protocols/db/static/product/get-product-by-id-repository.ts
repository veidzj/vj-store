import { type Product } from '@/domain/models'

export interface GetProductByIdRepository {
  getById: (id: string) => Promise<GetProductByIdRepository.Output>
}

export namespace GetProductByIdRepository {
  export type Output = Product
}
