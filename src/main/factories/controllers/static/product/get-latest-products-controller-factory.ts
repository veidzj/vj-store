import { LogControllerDecoratorFactory } from '@/main/factories/decorators/log'
import { GetLatestProductsFactory } from '@/main/factories/usecases/static/product'
import { type Controller } from '@/presentation/protocols'
import { GetLatestProductsController } from '@/presentation/controllers/static/product'

export class GetLatestProductsControllerFactory {
  public static makeGetLatestProductsControllerFactory = (): Controller => {
    const controller = new GetLatestProductsController(GetLatestProductsFactory.makeGetLatestProducts())
    return LogControllerDecoratorFactory.makeLogControllerDecorator(controller)
  }
}
