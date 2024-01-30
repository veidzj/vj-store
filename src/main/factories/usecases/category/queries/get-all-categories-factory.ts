import { type GetAllCategories } from '@/domain/usecases/category/queries'
import { DbGetAllCategories } from '@/application/usecases/category/queries'
import { GetAllCategoriesMongoRepository } from '@/infra/db/mongodb/category/queries'

export class GetAllCategoriesFactory {
  public static readonly makeGetAllCategories = (): GetAllCategories => {
    const getAllCategories = new GetAllCategoriesMongoRepository()
    return new DbGetAllCategories(getAllCategories)
  }
}
