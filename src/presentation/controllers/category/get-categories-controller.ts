import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { type GetCategories } from '@/domain/usecases/category'
import { HttpHelper } from '@/presentation/helpers'

export class GetCategoriesController implements Controller {
  constructor(private readonly getCategories: GetCategories) {}

  public handle = async(request: any): Promise<HttpResponse> => {
    try {
      const categories = await this.getCategories.get()
      return HttpHelper.ok(categories)
    } catch (error) {
      return HttpHelper.serverError(error)
    }
  }
}
