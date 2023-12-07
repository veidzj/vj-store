import { type GetProductBySlug } from '@/domain/usecases/static/product'
import { DbGetProductBySlug } from '@/application/usecases/static/product'
import { StaticProductMongoRepository } from '@/infra/db/mongodb/static/product'

export class GetProductBySlugFactory {
  public static makeGetProductBySlug = (): GetProductBySlug => {
    const staticProductMongoRepository = new StaticProductMongoRepository()
    return new DbGetProductBySlug(staticProductMongoRepository)
  }
}
