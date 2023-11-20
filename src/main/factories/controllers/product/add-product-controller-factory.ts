import { makeLogControllerDecorator } from '@/main/factories/decorators/log'
import { type Controller } from '@/presentation/protocols'
import { AddProductController } from '@/presentation/controllers/product'
import { makeAddProductValidation } from '@/main/factories/validations/product'
import { makeDbAddProduct } from '@/main/factories/usecases/product'

export const makeAddProductController = (): Controller => {
  const controller = new AddProductController(makeAddProductValidation(), makeDbAddProduct())
  return makeLogControllerDecorator(controller)
}
