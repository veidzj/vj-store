import { type Controller, type Response } from '@/presentation/protocols'
import { type GetAllProductsControllerRequest } from '@/presentation/protocols/product'
import { HttpHelper } from '@/presentation/helpers'
import { type GetAllProducts } from '@/domain/usecases/product'

export class GetAllProductsController implements Controller {
  constructor(private readonly getAllProducts: GetAllProducts) {}

  public handle = async(request: GetAllProductsControllerRequest): Promise<Response> => {
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
