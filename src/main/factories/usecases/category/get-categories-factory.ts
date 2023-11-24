import { type GetAllCategories } from '@/domain/usecases/category'
import { DbGetAllCategories } from '@/application/usecases/category'
import { StaticCategoryMongoRepository } from '@/infra/db/mongodb/static/category'

export const makeDbGetAllCategories = (): GetAllCategories => {
  const staticCategoryMongoRepository = new StaticCategoryMongoRepository()
  return new DbGetAllCategories(staticCategoryMongoRepository)
}
