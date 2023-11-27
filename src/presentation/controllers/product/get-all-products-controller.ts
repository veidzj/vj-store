import { type Controller, type Response } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type GetAllProducts } from '@/domain/usecases/product'

export class GetAllProductsController implements Controller {
  constructor(private readonly getAllProducts: GetAllProducts) {}

  public handle = async(request: GetAllProductsController.Request): Promise<Response> => {
    try {
      const page = Number(request.page) || 1
      const limit = Number(request.limit) || 25
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
