import { type Controller, type Response } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type UpdateProduct } from '@/domain/usecases/product/commands'

export class UpdateProductController implements Controller {
  constructor(private readonly updateProduct: UpdateProduct) {}

  public async handle(request: UpdateProductController.Request): Promise<Response> {
    try {
      await this.updateProduct.update(request)
      return HttpHelper.ok({})
    } catch (error) {
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
