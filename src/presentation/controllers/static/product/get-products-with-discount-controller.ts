import { type Controller, type Response } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { DEFAULT_PAGE, DEFAULT_LIMIT } from '@/presentation/constants'
import { type GetProductsWithDiscount } from '@/domain/usecases/static/product'

export class GetProductsWithDiscountController implements Controller {
  constructor(private readonly getProductsWithDiscount: GetProductsWithDiscount) {}

  public handle = async(request: GetProductsWithDiscountController.Request): Promise<Response> => {
    try {
      const page = Number(request.page) || DEFAULT_PAGE
      const limit = Number(request.limit) || DEFAULT_LIMIT
      const products = await this.getProductsWithDiscount.getWithDiscount(page, limit)
      return HttpHelper.ok(products)
    } catch (error) {
      return HttpHelper.serverError(error)
    }
  }
}

export namespace GetProductsWithDiscountController {
  export interface Request {
    page?: string
    limit?: string
  }
}
