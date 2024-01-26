import { type GetLatestProducts } from '@/domain/usecases/product/queries'
import { GetLatestProductsMongoRepository } from '@/infra/db/mongodb/product/queries'
import { DbGetLatestProducts } from '@/application/usecases/product/queries'

export class GetLatestProductsFactory {
  public static makeGetLatestProducts = (): GetLatestProducts => {
    const getLatestProductsRepository = new GetLatestProductsMongoRepository()
    return new DbGetLatestProducts(getLatestProductsRepository)
  }
}
