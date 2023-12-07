import { type GetProductsWithDiscount } from '@/domain/usecases/static/product'
import { DbGetProductsWithDiscount } from '@/application/usecases/static/product'
import { StaticProductMongoRepository } from '@/infra/db/mongodb/static/product'

export class GetProductsWithDiscountFactory {
  public static makeGetProductsWithDiscount = (): GetProductsWithDiscount => {
    const staticProductMongoRepository = new StaticProductMongoRepository()
    return new DbGetProductsWithDiscount(staticProductMongoRepository)
  }
}
