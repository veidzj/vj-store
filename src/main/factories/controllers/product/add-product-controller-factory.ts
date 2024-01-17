import { AddProductFactory } from '@/main/factories/usecases/product/commands'
import { type Controller } from '@/presentation/protocols'
import { AddProductController } from '@/presentation/controllers/product'

export class AddProductControllerFactory {
  public static makeAddProductController = (): Controller => {
    const controller = new AddProductController(AddProductFactory.makeAddProduct())
    return controller
  }
}
