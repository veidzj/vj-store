import { type AddProduct } from '@/domain/usecases/product'
import { DbAddProduct } from '@/application/usecases/product'
import { DynamicProductMongoRepository } from '@/infra/db/mongodb/dynamic/product'

export const makeDbAddProduct = (): AddProduct => {
  const dynamicProductMongoRepository = new DynamicProductMongoRepository()
  return new DbAddProduct(dynamicProductMongoRepository)
}
