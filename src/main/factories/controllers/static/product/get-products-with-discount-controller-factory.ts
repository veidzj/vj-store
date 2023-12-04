import { LogControllerDecoratorFactory } from '@/main/factories/decorators/log'
import { GetProductsWithDiscountFactory } from '@/main/factories/usecases/static/product'
import { type Controller } from '@/presentation/protocols'
import { GetProductsWithDiscountController } from '@/presentation/controllers/static/product'

export class GetProductsWithDiscountControllerFactory {
  public static makeGetProductsWithDiscountController = (): Controller => {
    const controller = new GetProductsWithDiscountController(GetProductsWithDiscountFactory.makeGetProductsWithDiscount())
    return LogControllerDecoratorFactory.makeLogControllerDecorator(controller)
  }
}
