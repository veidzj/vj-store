import { AddCategoryFactory } from '@/main/factories/usecases/category/commands'
import { type Controller } from '@/presentation/protocols'
import { AddCategoryController } from '@/presentation/controllers/category/commands'

export class AddCategoryControllerFactory {
  public static makeAddCategoryController = (): Controller => {
    const controller = new AddCategoryController(AddCategoryFactory.makeAddCategory())
    return controller
  }
}
