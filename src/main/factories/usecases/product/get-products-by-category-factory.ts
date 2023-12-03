import { type GetProductsByCategory } from '@/domain/usecases/static/product'
import { DbGetProductsByCategory } from '@/application/usecases/static/product'
import { StaticCategoryMongoRepository } from '@/infra/db/mongodb/static/category'
import { StaticProductMongoRepository } from '@/infra/db/mongodb/static/product'

export const makeDbGetProductsByCategory = (): GetProductsByCategory => {
  const staticCategoryMongoRepository = new StaticCategoryMongoRepository()
  const staticProductMongoRepository = new StaticProductMongoRepository()
  return new DbGetProductsByCategory(staticCategoryMongoRepository, staticProductMongoRepository)
}
