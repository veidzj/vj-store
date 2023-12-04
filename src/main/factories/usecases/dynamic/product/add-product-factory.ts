import { type AddProduct } from '@/domain/usecases/dynamic/product'
import { DbAddProduct } from '@/application/usecases/dynamic/product'
import { DynamicProductMongoRepository } from '@/infra/db/mongodb/dynamic/product'
import { StaticCategoryMongoRepository } from '@/infra/db/mongodb/static/category'

export class AddProductFactory {
  public static makeAddProduct = (): AddProduct => {
    const dynamicProductMongoRepository = new DynamicProductMongoRepository()
    const staticCategoryMongoRepository = new StaticCategoryMongoRepository()
    return new DbAddProduct(staticCategoryMongoRepository, dynamicProductMongoRepository)
  }
}
