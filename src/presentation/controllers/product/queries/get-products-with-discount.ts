import { type Controller, type Response } from '@/presentation/protocols'
import { DEFAULT_PAGE, DEFAULT_LIMIT } from '@/presentation/constants'
import { HttpHelper } from '@/presentation/helpers'
import { type GetProductsWithDiscount } from '@/domain/usecases/product/queries'

export class GetProductsWithDiscountController implements Controller {
  constructor(private readonly getProductsWithDiscount: GetProductsWithDiscount) {}

  public async handle(request: GetProductsWithDiscountController.Request): Promise<Response> {
    try {
      const page = Number(request.page) || DEFAULT_PAGE
      const limit = Number(request.limit) || DEFAULT_LIMIT
      const { products, currentPage, totalPages, totalItems } = await this.getProductsWithDiscount.getWithDiscount(page, limit)
      return HttpHelper.ok({
        products,
        currentPage,
        totalPages,
        totalItems
      })
    } catch (error) {
      return HttpHelper.serverError(error as Error)
    }
  }
}

export namespace GetProductsWithDiscountController {
  export interface Request {
    page?: string
    limit?: string
  }
}
