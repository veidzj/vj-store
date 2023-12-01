import { type Controller, type Validation, type Response } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type AddProduct } from '@/domain/usecases/product'
import { ValidationError, CategoryError } from '@/domain/errors'

export class AddProductController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addProduct: AddProduct
  ) {}

  public handle = async(request: AddProductController.Request): Promise<Response> => {
    try {
      this.validation.validate(request)
      await this.addProduct.add({ ...request, addedAt: new Date() })
      return HttpHelper.ok({ message: 'Product successfully added' })
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

export namespace AddProductController {
  export interface Request {
    name: string
    description: string
    price: number
    discountPercentage: number
    category: string
    imageUrls: string[]
    quantity: number
  }
}
