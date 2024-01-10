import { type Controller, type Response } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type GetAllCategories } from '@/domain/usecases/category/queries'

export class GetAllCategoriesController implements Controller {
  constructor(private readonly getAllCategories: GetAllCategories) {}

  public async handle(): Promise<Response> {
    try {
      const categories = await this.getAllCategories.getAll()
      return HttpHelper.ok(categories)
    } catch (error) {
      return HttpHelper.serverError(error as Error)
    }
  }
}
