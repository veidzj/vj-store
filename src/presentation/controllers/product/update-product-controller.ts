import { type Controller, type Validation, type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type UpdateProduct } from '@/domain/usecases/product'
import { ValidationError } from '@/domain/errors'

export class UpdateProductController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly updateProduct: UpdateProduct
  ) {}

  public handle = async(request: UpdateProductController.Request): Promise<HttpResponse> => {
    try {
      this.validation.validate(request)
      await this.updateProduct.update(request)
      return HttpHelper.ok({ message: 'Product successfully updated' })
    } catch (error) {
      if (error instanceof ValidationError) {
        return HttpHelper.badRequest(error)
      }
      return HttpHelper.serverError(error)
    }
  }
}

export namespace UpdateProductController {
  export interface Request {
    productId: string
    name: string
    description: string
    price: number
    discountPercentage: number
    category: string
    imageUrls: string[]
    quantity: number
  }
}
