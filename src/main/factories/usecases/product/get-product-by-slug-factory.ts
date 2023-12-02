import { type GetProductBySlug } from '@/domain/usecases/product'
import { DbGetProductBySlug } from '@/application/usecases/static/product'
import { StaticProductMongoRepository } from '@/infra/db/mongodb/static/product'

export const makeDbGetProductBySlug = (): GetProductBySlug => {
  const staticProductMongoRepository = new StaticProductMongoRepository()
  return new DbGetProductBySlug(staticProductMongoRepository)
}
