import { UpdateProductFactory } from '@/main/factories/usecases/product/commands'
import { type Controller } from '@/presentation/protocols'
import { UpdateProductController } from '@/presentation/controllers/product'

export class UpdateProductControllerFactory {
  public static makeUpdateProductController = (): Controller => {
    const controller = new UpdateProductController(UpdateProductFactory.makeUpdateProduct())
    return controller
  }
}
