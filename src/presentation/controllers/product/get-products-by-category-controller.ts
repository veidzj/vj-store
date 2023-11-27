import { type Controller, type Response } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type GetProductsByCategory } from '@/domain/usecases/product'
import { CategoryError } from '@/domain/errors'

export class GetProductsByCategoryController implements Controller {
  constructor(private readonly getProductsByCategory: GetProductsByCategory) {}

  public handle = async(request: GetProductsByCategoryController.Request): Promise<Response> => {
    try {
      const { category } = request
      const products = await this.getProductsByCategory.getByCategory(category)
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
  }
}
