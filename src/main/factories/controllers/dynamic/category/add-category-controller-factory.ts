import { LogControllerDecoratorFactory } from '@/main/factories/decorators/log'
import { makeAddCategoryValidation } from '@/main/factories/validations/category'
import { AddCategoryFactory } from '@/main/factories/usecases/dynamic/category'
import { type Controller } from '@/presentation/protocols'
import { AddCategoryController } from '@/presentation/controllers/dynamic/category'

export class AddCategoryControllerFactory {
  public static makeAddCategoryController = (): Controller => {
    const controller = new AddCategoryController(makeAddCategoryValidation(), AddCategoryFactory.makeAddCategory())
    return LogControllerDecoratorFactory.makeLogControllerDecorator(controller)
  }
}
