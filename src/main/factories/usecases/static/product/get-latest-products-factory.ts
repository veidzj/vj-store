import { type GetLatestProducts } from '@/domain/usecases/static/product'
import { DbGetLatestProducts } from '@/application/usecases/static/product'
import { StaticProductMongoRepository } from '@/infra/db/mongodb/static/product'

export class GetLatestProductsFactory {
  public static makeGetLatestProducts = (): GetLatestProducts => {
    const staticProductMongoRepository = new StaticProductMongoRepository()
    return new DbGetLatestProducts(staticProductMongoRepository)
  }
}
