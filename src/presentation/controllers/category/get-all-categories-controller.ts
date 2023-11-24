import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { type GetAllCategories } from '@/domain/usecases/category'
import { HttpHelper } from '@/presentation/helpers'

export class GetAllCategoriesController implements Controller {
  constructor(private readonly getAllCategories: GetAllCategories) {}

  public handle = async(request: any): Promise<HttpResponse> => {
    try {
      const categories = await this.getAllCategories.getAll()
      return HttpHelper.ok(categories)
    } catch (error) {
      return HttpHelper.serverError(error)
    }
  }
}
