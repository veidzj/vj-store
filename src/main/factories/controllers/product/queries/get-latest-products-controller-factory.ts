import { GetLatestProductsFactory } from '@/main/factories/usecases/product/queries'
import { type Controller } from '@/presentation/protocols'
import { GetLatestProductsController } from '@/presentation/controllers/product/queries'

export class GetLatestProductsControllerFactory {
  public static makeGetLatestProductsController = (): Controller => {
    const controller = new GetLatestProductsController(GetLatestProductsFactory.makeGetLatestProducts())
    return controller
  }
}
