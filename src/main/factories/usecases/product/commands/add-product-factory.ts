import { type AddProduct } from '@/domain/usecases/product/commands'
import { DbAddProduct } from '@/application/usecases/product/commands'
import { CheckCategoryByNameMongoRepository } from '@/infra/db/mongodb/category/queries'
import { CheckProductByNameMongoRepository } from '@/infra/db/mongodb/product/queries'
import { AddProductMongoRepository } from '@/infra/db/mongodb/product/commands'

export class AddProductFactory {
  public static readonly makeAddProduct = (): AddProduct => {
    const checkProductByNameRepository = new CheckProductByNameMongoRepository()
    const checkCategoryByNameRepository = new CheckCategoryByNameMongoRepository()
    const addProductRepository = new AddProductMongoRepository()
    return new DbAddProduct(checkProductByNameRepository, checkCategoryByNameRepository, addProductRepository)
  }
}
