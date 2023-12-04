import { LogControllerDecoratorFactory } from '@/main/factories/decorators/log'
import { makeAddProductValidation } from '@/main/factories/validations/product'
import { UpdateProductFactory } from '@/main/factories/usecases/dynamic/product'
import { type Controller } from '@/presentation/protocols'
import { UpdateProductController } from '@/presentation/controllers/dynamic/product'

export class UpdateProductControllerFactory {
  public static makeUpdateProductController = (): Controller => {
    const controller = new UpdateProductController(makeAddProductValidation(), UpdateProductFactory.makeUpdateProduct())
    return LogControllerDecoratorFactory.makeLogControllerDecorator(controller)
  }
}
