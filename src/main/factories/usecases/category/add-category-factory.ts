import { type AddCategory } from '@/domain/usecases/category'
import { DbAddCategory } from '@/application/usecases/category'
import { DynamicCategoryMongoRepository } from '@/infra/db/mongodb/dynamic/category'

export const makeDbAddCategory = (): AddCategory => {
  const dynamicCategoryMongoRepository = new DynamicCategoryMongoRepository()
  return new DbAddCategory(dynamicCategoryMongoRepository)
}
