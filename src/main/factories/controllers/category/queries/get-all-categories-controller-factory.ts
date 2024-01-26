import { GetAllCategoriesFactory } from '@/main/factories/usecases/category/queries'
import { type Controller } from '@/presentation/protocols'
import { GetAllCategoriesController } from '@/presentation/controllers/category/queries'

export class GetAllCategoriesControllerFactory {
  public static makeGetAllCategoriesController = (): Controller => {
    const controller = new GetAllCategoriesController(GetAllCategoriesFactory.makeGetAllCategories())
    return controller
  }
}
