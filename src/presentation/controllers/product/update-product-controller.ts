import { type Controller, type Validation, type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { ValidationError } from '@/domain/errors'

export class UpdateProductController implements Controller {
  constructor(
    private readonly validation: Validation
  ) {}

  public handle = async(request: any): Promise<HttpResponse> => {
    try {
      this.validation.validate(request)
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
