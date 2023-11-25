import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type GetAllProducts } from '@/domain/usecases/product'

export class GetAllProductsController implements Controller {
  constructor(private readonly getAllProducts: GetAllProducts) {}

  public handle = async(request: any): Promise<HttpResponse> => {
    try {
      const products = await this.getAllProducts.getAll()
      return HttpHelper.ok(products)
    } catch (error) {
      return HttpHelper.serverError(error)
    }
  }
}
