import { LogControllerDecoratorFactory } from '@/main/factories/decorators/log'
import { makeDbGetAllCategories } from '@/main/factories/usecases/static/category'
import { type Controller } from '@/presentation/protocols'
import { GetAllCategoriesController } from '@/presentation/controllers/static/category'

export class GetAllCategoriesControllerFactory {
  public static makeGetAllCategoriesController = (): Controller => {
    const controller = new GetAllCategoriesController(makeDbGetAllCategories())
    return LogControllerDecoratorFactory.makeLogControllerDecorator(controller)
  }
}
