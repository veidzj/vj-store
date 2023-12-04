import { LogControllerDecoratorFactory } from '@/main/factories/decorators/log'
import { makeAddProductValidation } from '@/main/factories/validations/product'
import { AddProductFactory } from '@/main/factories/usecases/dynamic/product'
import { type Controller } from '@/presentation/protocols'
import { AddProductController } from '@/presentation/controllers/dynamic/product'

export class AddProductControllerFactory {
  public static makeAddProductController = (): Controller => {
    const controller = new AddProductController(makeAddProductValidation(), AddProductFactory.makeAddProduct())
    return LogControllerDecoratorFactory.makeLogControllerDecorator(controller)
  }
}
