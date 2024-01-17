import { type Controller, type Response } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type UpdateProduct } from '@/domain/usecases/product/commands'
import { EntityValidationError } from '@/domain/errors'
import { ProductNotFoundError } from '@/domain/errors/product'

export class UpdateProductController implements Controller {
  constructor(private readonly updateProduct: UpdateProduct) {}

  public async handle(request: UpdateProductController.Request): Promise<Response> {
    try {
      await this.updateProduct.update(request)
      return HttpHelper.ok({})
    } catch (error) {
      if (error instanceof EntityValidationError) {
        return HttpHelper.badRequest(error)
      }
      if (error instanceof ProductNotFoundError) {
        return HttpHelper.notFound(error)
      }
      return HttpHelper.serverError(error as Error)
    }
  }
}

export namespace UpdateProductController {
  export interface Request {
    id: string
    name: string
    description: string
    price: number
    discountPercentage: number
    quantity: number
    category: string
    imagesUrls: string[]
  }
}
