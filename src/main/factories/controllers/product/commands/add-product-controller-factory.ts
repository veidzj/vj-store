import { AddProductFactory } from '@/main/factories/usecases/product/commands'
import { LogErrorControllerDecoratorFactory } from '@/main/factories/decorators/log'
import { type Controller } from '@/presentation/protocols'
import { AddProductController } from '@/presentation/controllers/product/commands'

export class AddProductControllerFactory {
  public static makeAddProductController = (): Controller => {
    const controller = new AddProductController(AddProductFactory.makeAddProduct())
    return LogErrorControllerDecoratorFactory.makeLogErrorControllerDecorator(controller)
  }
}
