import { LogControllerDecoratorFactory } from '@/main/factories/decorators/log'
import { makeDbGetProductsByCategory } from '@/main/factories/usecases/static/product'
import { type Controller } from '@/presentation/protocols'
import { GetProductsByCategoryController } from '@/presentation/controllers/static/product'

export class GetProductsByCategoryControllerFactory {
  public static makeGetProductsByCategoryController = (): Controller => {
    const controller = new GetProductsByCategoryController(makeDbGetProductsByCategory())
    return LogControllerDecoratorFactory.makeLogControllerDecorator(controller)
  }
}
