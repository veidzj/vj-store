import { UpdateCategoryFactory } from '@/main/factories/usecases/category/commands'
import { type Controller } from '@/presentation/protocols'
import { UpdateCategoryController } from '@/presentation/controllers/category/commands/update-category-controller'

export class UpdateCategoryControllerFactory {
  public static makeUpdateCategoryController = (): Controller => {
    const controller = new UpdateCategoryController(UpdateCategoryFactory.makeUpdateCategory())
    return controller
  }
}
