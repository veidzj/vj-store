import { GetAllCategoriesFactory } from '@/main/factories/usecases/category/queries'
import { LogErrorControllerDecoratorFactory } from '@/main/factories/decorators/log'
import { type Controller } from '@/presentation/protocols'
import { GetAllCategoriesController } from '@/presentation/controllers/category/queries'

export class GetAllCategoriesControllerFactory {
  public static makeGetAllCategoriesController = (): Controller => {
    const controller = new GetAllCategoriesController(GetAllCategoriesFactory.makeGetAllCategories())
    return LogErrorControllerDecoratorFactory.makeLogErrorControllerDecorator(controller)
  }
}
