import { type GetProductsWithDiscount } from '@/domain/usecases/product/queries'
import { GetProductsWithDiscountMongoRepository } from '@/infra/db/mongodb/product/queries'
import { DbGetProductsWithDiscount } from '@/application/usecases/product/queries'

export class GetProductsWithDiscountFactory {
  public static readonly makeGetProductsWithDiscount = (): GetProductsWithDiscount => {
    const getProductsWithDiscountRepository = new GetProductsWithDiscountMongoRepository()
    return new DbGetProductsWithDiscount(getProductsWithDiscountRepository)
  }
}
