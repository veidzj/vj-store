import { type AddCategory } from '@/domain/usecases/dynamic/category'
import { DbAddCategory } from '@/application/usecases/dynamic/category'
import { DynamicCategoryMongoRepository } from '@/infra/db/mongodb/dynamic/category'

export class AddCategoryFactory {
  public static makeAddCategory = (): AddCategory => {
    const dynamicCategoryMongoRepository = new DynamicCategoryMongoRepository()
    return new DbAddCategory(dynamicCategoryMongoRepository)
  }
}
