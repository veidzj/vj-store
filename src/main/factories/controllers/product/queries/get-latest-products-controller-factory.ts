import { GetLatestProductsFactory } from '@/main/factories/usecases/product/queries'
import { LogErrorControllerDecoratorFactory } from '@/main/factories/decorators/log'
import { type Controller } from '@/presentation/protocols'
import { GetLatestProductsController } from '@/presentation/controllers/product/queries'

export class GetLatestProductsControllerFactory {
  public static readonly makeGetLatestProductsController = (): Controller => {
    const controller = new GetLatestProductsController(GetLatestProductsFactory.makeGetLatestProducts())
    return LogErrorControllerDecoratorFactory.makeLogErrorControllerDecorator(controller)
  }
}
