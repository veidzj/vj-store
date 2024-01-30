import { type GetProductsByCategory } from '@/domain/usecases/product/queries'
import { GetProductsByCategoryMongoRepository } from '@/infra/db/mongodb/product/queries'
import { DbGetProductsByCategory } from '@/application/usecases/product/queries'

export class GetProductsByCategoryFactory {
  public static readonly makeGetProductsByCategory = (): GetProductsByCategory => {
    const getProductsByCategoryRepository = new GetProductsByCategoryMongoRepository()
    return new DbGetProductsByCategory(getProductsByCategoryRepository)
  }
}
