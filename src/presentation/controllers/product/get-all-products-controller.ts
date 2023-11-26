import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type GetAllProducts } from '@/domain/usecases/product'

export class GetAllProductsController implements Controller {
  constructor(private readonly getAllProducts: GetAllProducts) {}

  public handle = async(request: GetAllProductsController.Request): Promise<HttpResponse> => {
    try {
      const page = Number(request.page)
      const limit = Number(request.limit)
      const products = await this.getAllProducts.getAll(page, limit)
      return HttpHelper.ok(products)
    } catch (error) {
      return HttpHelper.serverError(error)
    }
  }
}

export namespace GetAllProductsController {
  export interface Request {
    page?: string
    limit?: string
  }
}
