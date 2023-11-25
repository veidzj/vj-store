import { type GetAllProducts } from '@/domain/usecases/product'
import { DbGetAllProducts } from '@/application/usecases/product'
import { StaticProductMongoRepository } from '@/infra/db/mongodb/static/product'

export const makeDbGetAllProducts = (): GetAllProducts => {
  const staticProductMongoRepository = new StaticProductMongoRepository()
  return new DbGetAllProducts(staticProductMongoRepository)
}
