import { type Controller, type Response } from '@/presentation/protocols'
import { type GetProductBySlugControllerRequest } from '@/presentation/protocols/product'
import { HttpHelper } from '@/presentation/helpers'
import { type GetProductBySlug } from '@/domain/usecases/product'
import { ProductError } from '@/domain/errors'

export class GetProductBySlugController implements Controller {
  constructor(private readonly getProductBySlug: GetProductBySlug) {}

  public handle = async(request: GetProductBySlugControllerRequest): Promise<Response> => {
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
