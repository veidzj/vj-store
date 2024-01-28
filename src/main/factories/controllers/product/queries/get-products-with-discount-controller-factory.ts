import { GetProductsWithDiscountFactory } from '@/main/factories/usecases/product/queries'
import { LogErrorControllerDecoratorFactory } from '@/main/factories/decorators/log'
import { type Controller } from '@/presentation/protocols'
import { GetProductsWithDiscountController } from '@/presentation/controllers/product/queries'

export class GetProductsWithDiscountControllerFactory {
  public static makeGetProductsWithDiscountController = (): Controller => {
    const controller = new GetProductsWithDiscountController(GetProductsWithDiscountFactory.makeGetProductsWithDiscount())
    return LogErrorControllerDecoratorFactory.makeLogErrorControllerDecorator(controller)
  }
}
