import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { type GetCategories } from '@/domain/usecases/category'

export class GetCategoriesController implements Controller {
  constructor(private readonly getCategories: GetCategories) {}

  public handle = async(request: any): Promise<HttpResponse> => {
    await this.getCategories.get()
    return {
      statusCode: 500,
      body: ''
    }
  }
}
