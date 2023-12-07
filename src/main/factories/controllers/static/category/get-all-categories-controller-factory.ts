import { LogControllerDecoratorFactory } from '@/main/factories/decorators/log'
import { GetAllCategoriesFactory } from '@/main/factories/usecases/static/category'
import { type Controller } from '@/presentation/protocols'
import { GetAllCategoriesController } from '@/presentation/controllers/static/category'

export class GetAllCategoriesControllerFactory {
  public static makeGetAllCategoriesController = (): Controller => {
    const controller = new GetAllCategoriesController(GetAllCategoriesFactory.makeGetAllCategories())
    return LogControllerDecoratorFactory.makeLogControllerDecorator(controller)
  }
}
