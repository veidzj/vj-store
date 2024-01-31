import { type GetProductsByCategory } from '@/domain/usecases/product/queries'
import { DbGetProductsByCategory } from '@/application/usecases/product/queries'
import { GetProductsByCategoryMongoRepository } from '@/infra/db/mongodb/product/queries'
import { CheckCategoryByNameMongoRepository } from '@/infra/db/mongodb/category/queries'

export class GetProductsByCategoryFactory {
  public static readonly makeGetProductsByCategory = (): GetProductsByCategory => {
    const checkCategoryByNameRepository = new CheckCategoryByNameMongoRepository()
    const getProductsByCategoryRepository = new GetProductsByCategoryMongoRepository()
    return new DbGetProductsByCategory(checkCategoryByNameRepository, getProductsByCategoryRepository)
  }
}
