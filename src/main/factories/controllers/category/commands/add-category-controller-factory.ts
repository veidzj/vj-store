import { AddCategoryFactory } from '@/main/factories/usecases/category/commands'
import { LogErrorControllerDecoratorFactory } from '@/main/factories/decorators/log'
import { type Controller } from '@/presentation/protocols'
import { AddCategoryController } from '@/presentation/controllers/category/commands'

export class AddCategoryControllerFactory {
  public static readonly makeAddCategoryController = (): Controller => {
    const controller = new AddCategoryController(AddCategoryFactory.makeAddCategory())
    return LogErrorControllerDecoratorFactory.makeLogErrorControllerDecorator(controller)
  }
}
