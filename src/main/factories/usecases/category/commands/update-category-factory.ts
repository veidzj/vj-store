import { type UpdateCategory } from '@/domain/usecases/category/commands'
import { DbUpdateCategory } from '@/application/usecases/category/commands'
import { CheckCategoryByIdMongoRepository } from '@/infra/db/mongodb/category/queries'
import { UpdateCategoryMongoRepository } from '@/infra/db/mongodb/category/commands'

export class UpdateCategoryFactory {
  public static makeUpdateCategory = (): UpdateCategory => {
    const checkCategoryByIdRepository = new CheckCategoryByIdMongoRepository()
    const addCategoryRepository = new UpdateCategoryMongoRepository()
    return new DbUpdateCategory(checkCategoryByIdRepository, addCategoryRepository)
  }
}
