import { type AddCategory } from '@/domain/usecases/category/commands'
import { DbAddCategory } from '@/application/usecases/category/commands'
import { CheckCategoryByNameMongoRepository } from '@/infra/db/mongodb/category/queries'
import { AddCategoryMongoRepository } from '@/infra/db/mongodb/category/commands'

export class AddCategoryFactory {
  public static makeAddCategory = (): AddCategory => {
    const checkCategoryByNameRepository = new CheckCategoryByNameMongoRepository()
    const addCategoryRepository = new AddCategoryMongoRepository()
    return new DbAddCategory(checkCategoryByNameRepository, addCategoryRepository)
  }
}
