import { type Controller, type Response } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { DEFAULT_PAGE, DEFAULT_LIMIT } from '@/presentation/constants'
import { type GetProductsByCategory } from '@/domain/usecases/product'
import { CategoryError } from '@/domain/errors'

export class GetProductsByCategoryController implements Controller {
  constructor(private readonly getProductsByCategory: GetProductsByCategory) {}

  public handle = async(request: GetProductsByCategoryController.Request): Promise<Response> => {
    try {
      const { category } = request
      const page = Number(request.page) || DEFAULT_PAGE
      const limit = Number(request.limit) || DEFAULT_LIMIT
      const products = await this.getProductsByCategory.getByCategory(category, page, limit)
      return HttpHelper.ok(products)
    } catch (error) {
      if (error instanceof CategoryError) {
        return HttpHelper.badRequest(error)
      }
      return HttpHelper.serverError(error)
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
