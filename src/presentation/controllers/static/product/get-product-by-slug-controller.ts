import { type Controller, type Response } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type GetProductBySlug } from '@/domain/usecases/static/product'
import { ProductError } from '@/domain/errors'

export class GetProductBySlugController implements Controller {
  constructor(private readonly getProductBySlug: GetProductBySlug) {}

  public handle = async(request: GetProductBySlugController.Request): Promise<Response> => {
    try {
      const { slug } = request
      const product = await this.getProductBySlug.getBySlug(slug)
      return HttpHelper.ok(product)
    } catch (error) {
      if (error instanceof ProductError) {
        return HttpHelper.badRequest(error)
      }
      return HttpHelper.serverError(error)
    }
  }
}

export namespace GetProductBySlugController {
  export interface Request {
    slug: string
  }
}
