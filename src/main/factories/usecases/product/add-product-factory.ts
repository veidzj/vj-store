import { type AddProduct } from '@/domain/usecases/product'
import { DbAddProduct } from '@/application/usecases/dynamic/product'
import { DynamicProductMongoRepository } from '@/infra/db/mongodb/dynamic/product'
import { StaticCategoryMongoRepository } from '@/infra/db/mongodb/static/category'

export const makeDbAddProduct = (): AddProduct => {
  const dynamicProductMongoRepository = new DynamicProductMongoRepository()
  const staticCategoryMongoRepository = new StaticCategoryMongoRepository()
  return new DbAddProduct(staticCategoryMongoRepository, dynamicProductMongoRepository)
}
