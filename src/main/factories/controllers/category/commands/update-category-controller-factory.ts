import { UpdateCategoryFactory } from '@/main/factories/usecases/category/commands'
import { LogErrorControllerDecoratorFactory } from '@/main/factories/decorators/log'
import { type Controller } from '@/presentation/protocols'
import { UpdateCategoryController } from '@/presentation/controllers/category/commands/update-category-controller'

export class UpdateCategoryControllerFactory {
  public static readonly makeUpdateCategoryController = (): Controller => {
    const controller = new UpdateCategoryController(UpdateCategoryFactory.makeUpdateCategory())
    return LogErrorControllerDecoratorFactory.makeLogErrorControllerDecorator(controller)
  }
}
