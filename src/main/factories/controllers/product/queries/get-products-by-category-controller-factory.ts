import { GetProductsByCategoryFactory } from '@/main/factories/usecases/product/queries'
import { LogErrorControllerDecoratorFactory } from '@/main/factories/decorators/log'
import { type Controller } from '@/presentation/protocols'
import { GetProductsByCategoryController } from '@/presentation/controllers/product/queries'

export class GetProductsByCategoryControllerFactory {
  public static makeGetProductsByCategoryController = (): Controller => {
    const controller = new GetProductsByCategoryController(GetProductsByCategoryFactory.makeGetProductsByCategory())
    return LogErrorControllerDecoratorFactory.makeLogErrorControllerDecorator(controller)
  }
}
