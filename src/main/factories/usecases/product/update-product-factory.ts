import { type UpdateProduct } from '@/domain/usecases/product'
import { DbUpdateProduct } from '@/application/usecases/dynamic/product'
import { DynamicProductMongoRepository } from '@/infra/db/mongodb/dynamic/product'
import { StaticProductMongoRepository } from '@/infra/db/mongodb/static/product'

export const makeDbUpdateProduct = (): UpdateProduct => {
  const dynamicProductMongoRepository = new DynamicProductMongoRepository()
  const staticProductMongoRepository = new StaticProductMongoRepository()
  return new DbUpdateProduct(staticProductMongoRepository, dynamicProductMongoRepository)
}
