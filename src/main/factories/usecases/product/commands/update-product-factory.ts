import { type UpdateProduct } from '@/domain/usecases/product/commands'
import { DbUpdateProduct } from '@/application/usecases/product/commands'
import { CheckCategoryByNameMongoRepository } from '@/infra/db/mongodb/category/queries'
import { CheckProductByIdMongoRepository } from '@/infra/db/mongodb/product/queries'
import { UpdateProductMongoRepository } from '@/infra/db/mongodb/product/commands'

export class UpdateProductFactory {
  public static makeUpdateProduct = (): UpdateProduct => {
    const checkProductByIdRepository = new CheckProductByIdMongoRepository()
    const checkCategoryByNameRepository = new CheckCategoryByNameMongoRepository()
    const updateProductRepository = new UpdateProductMongoRepository()
    return new DbUpdateProduct(checkProductByIdRepository, checkCategoryByNameRepository, updateProductRepository)
  }
}
