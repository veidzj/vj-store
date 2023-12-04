import { LogControllerDecoratorFactory } from '@/main/factories/decorators/log'
import { GetProductsByCategoryFactory } from '@/main/factories/usecases/static/product'
import { type Controller } from '@/presentation/protocols'
import { GetProductsByCategoryController } from '@/presentation/controllers/static/product'

export class GetProductsByCategoryControllerFactory {
  public static makeGetProductsByCategoryController = (): Controller => {
    const controller = new GetProductsByCategoryController(GetProductsByCategoryFactory.makeGetProductsByCategory())
    return LogControllerDecoratorFactory.makeLogControllerDecorator(controller)
  }
}
