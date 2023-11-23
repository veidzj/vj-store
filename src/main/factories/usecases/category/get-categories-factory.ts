import { type GetCategories } from '@/domain/usecases/category'
import { DbGetCategories } from '@/application/usecases/category'
import { StaticCategoryMongoRepository } from '@/infra/db/mongodb/static/category'

export const makeDbGetCategories = (): GetCategories => {
  const staticCategoryMongoRepository = new StaticCategoryMongoRepository()
  return new DbGetCategories(staticCategoryMongoRepository)
}
