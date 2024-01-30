import { type Controller, type Response } from '@/presentation/protocols'
import { DEFAULT_PAGE, DEFAULT_LIMIT } from '@/presentation/constants'
import { HttpHelper } from '@/presentation/helpers'
import { type GetProductsByCategory } from '@/domain/usecases/product/queries'

export class GetProductsByCategoryController implements Controller {
  constructor(private readonly getProductsByCategory: GetProductsByCategory) {}

  public async handle(request: GetProductsByCategoryController.Request): Promise<Response> {
    try {
      const page = Number(request.page) || DEFAULT_PAGE
      const limit = Number(request.limit) || DEFAULT_LIMIT
      const { products, currentPage, totalPages, totalItems } = await this.getProductsByCategory.getByCategory(request.category, page, limit)
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

export namespace GetProductsByCategoryController {
  export interface Request {
    category: string
    page?: string
    limit?: string
  }
}
