import { makeLogControllerDecorator } from '@/main/factories/decorators/log'
import { makeAddCategoryValidation } from '@/main/factories/validations/category'
import { makeDbAddCategory } from '@/main/factories/usecases/dynamic/category'
import { type Controller } from '@/presentation/protocols'
import { AddCategoryController } from '@/presentation/controllers/dynamic/category'

export class AddCategoryControllerFactory {
  public static makeAddCategoryController = (): Controller => {
    const controller = new AddCategoryController(makeAddCategoryValidation(), makeDbAddCategory())
    return makeLogControllerDecorator(controller)
  }
}
