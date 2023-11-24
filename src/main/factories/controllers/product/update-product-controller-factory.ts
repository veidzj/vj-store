import { makeLogControllerDecorator } from '@/main/factories/decorators/log'
import { type Controller } from '@/presentation/protocols'
import { UpdateProductController } from '@/presentation/controllers/product'
import { makeAddProductValidation } from '@/main/factories/validations/product'
import { makeDbUpdateProduct } from '@/main/factories/usecases/product'

export const makeUpdateProductController = (): Controller => {
  const controller = new UpdateProductController(makeAddProductValidation(), makeDbUpdateProduct())
  return makeLogControllerDecorator(controller)
}
