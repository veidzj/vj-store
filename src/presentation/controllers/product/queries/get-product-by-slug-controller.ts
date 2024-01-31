import { type Controller, type Response } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type GetProductBySlug } from '@/domain/usecases/product/queries'

export class GetProductBySlugController implements Controller {
  constructor(private readonly getProductBySlug: GetProductBySlug) {}

  public async handle(request: GetProductBySlugController.Request): Promise<Response> {
    try {
      await this.getProductBySlug.getBySlug(request.slug)
      return HttpHelper.ok({})
    } catch (error) {
      return HttpHelper.serverError(error as Error)
    }
  }
}

export namespace GetProductBySlugController {
  export interface Request {
    slug: string
  }
}
