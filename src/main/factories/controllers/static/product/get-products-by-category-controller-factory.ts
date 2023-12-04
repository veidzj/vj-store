import { LogControllerDecoratorFactory } from '@/main/factories/decorators/log'
import { GetProductsByCategoryValidationFactory } from '@/main/factories/validations/product/get-products-by-category-validation-factory'
import { GetProductsByCategoryFactory } from '@/main/factories/usecases/static/product'
import { type Controller } from '@/presentation/protocols'
import { GetProductsByCategoryController } from '@/presentation/controllers/static/product'

export class GetProductsByCategoryControllerFactory {
  public static makeGetProductsByCategoryController = (): Controller => {
    const controller = new GetProductsByCategoryController(GetProductsByCategoryValidationFactory.makeGetProductsByCategoryValidation(), GetProductsByCategoryFactory.makeGetProductsByCategory())
    return LogControllerDecoratorFactory.makeLogControllerDecorator(controller)
  }
}
