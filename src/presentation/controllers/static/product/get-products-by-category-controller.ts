import { type Controller, type Validation, type Response } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { DEFAULT_PAGE, DEFAULT_LIMIT } from '@/presentation/constants'
import { type GetProductsByCategory } from '@/domain/usecases/static/product'
import { CategoryError, ValidationError } from '@/domain/errors'

export class GetProductsByCategoryController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly getProductsByCategory: GetProductsByCategory
  ) {}

  public handle = async(request: GetProductsByCategoryController.Request): Promise<Response> => {
    try {
      this.validation.validate(request)
      const { category } = request
      const page = Number(request.page) || DEFAULT_PAGE
      const limit = Number(request.limit) || DEFAULT_LIMIT
      const products = await this.getProductsByCategory.getByCategory(category, page, limit)
      return HttpHelper.ok(products)
    } catch (error) {
      if (error instanceof ValidationError) {
        return HttpHelper.badRequest(error)
      }
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
    sortBy?: string
  }
}
