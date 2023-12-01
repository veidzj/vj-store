import { makeLogControllerDecorator } from '@/main/factories/decorators/log'
import { makeAddCategoryValidation } from '@/main/factories/validations/category'
import { makeDbAddCategory } from '@/main/factories/usecases/category'
import { type Controller } from '@/presentation/protocols'
import { AddCategoryController } from '@/presentation/controllers/dynamic/category'

export const makeAddCategoryController = (): Controller => {
  const controller = new AddCategoryController(makeAddCategoryValidation(), makeDbAddCategory())
  return makeLogControllerDecorator(controller)
}
