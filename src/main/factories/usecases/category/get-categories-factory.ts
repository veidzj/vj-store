import { type GetAllCategories } from '@/domain/usecases/static/category'
import { DbGetAllCategories } from '@/application/usecases/static/category'
import { StaticCategoryMongoRepository } from '@/infra/db/mongodb/static/category'

export const makeDbGetAllCategories = (): GetAllCategories => {
  const staticCategoryMongoRepository = new StaticCategoryMongoRepository()
  return new DbGetAllCategories(staticCategoryMongoRepository)
}
