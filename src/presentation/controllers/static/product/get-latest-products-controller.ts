import { type Controller, type Response } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { DEFAULT_PAGE, DEFAULT_LIMIT } from '@/presentation/constants'
import { type GetLatestProducts } from '@/domain/usecases/static/product'

export class GetLatestProductsController implements Controller {
  constructor(private readonly getLatestProducts: GetLatestProducts) {}

  public handle = async(request: GetLatestProductsController.Request): Promise<Response> => {
    try {
      const page = Number(request.page) || DEFAULT_PAGE
      const limit = Number(request.limit) || DEFAULT_LIMIT
      const products = await this.getLatestProducts.getLatest(page, limit)
      return HttpHelper.ok(products)
    } catch (error) {
      return HttpHelper.serverError(error)
    }
  }
}

export namespace GetLatestProductsController {
  export interface Request {
    page?: string
    limit?: string
  }
}
