import { makeLogControllerDecorator } from '@/main/factories/decorators/log'
import { type Controller } from '@/presentation/protocols'
import { GetCategoriesController } from '@/presentation/controllers/category'
import { makeDbGetCategories } from '@/main/factories/usecases/category'

export const makeGetCategoriesController = (): Controller => {
  const controller = new GetCategoriesController(makeDbGetCategories())
  return makeLogControllerDecorator(controller)
}
