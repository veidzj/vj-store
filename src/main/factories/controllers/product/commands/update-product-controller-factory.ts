import { UpdateProductFactory } from '@/main/factories/usecases/product/commands'
import { LogErrorControllerDecoratorFactory } from '@/main/factories/decorators/log'
import { type Controller } from '@/presentation/protocols'
import { UpdateProductController } from '@/presentation/controllers/product/commands'

export class UpdateProductControllerFactory {
  public static readonly makeUpdateProductController = (): Controller => {
    const controller = new UpdateProductController(UpdateProductFactory.makeUpdateProduct())
    return LogErrorControllerDecoratorFactory.makeLogErrorControllerDecorator(controller)
  }
}
