import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { type GetCategories } from '@/domain/usecases/category'
import { HttpHelper } from '@/presentation/helpers'

export class GetCategoriesController implements Controller {
  private readonly httpHelper = new HttpHelper()

  constructor(private readonly getCategories: GetCategories) {}

  public handle = async(request: any): Promise<HttpResponse> => {
    const categories = await this.getCategories.get()
    return this.httpHelper.ok(categories)
  }
}
