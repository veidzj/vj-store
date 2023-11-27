import { type Controller, type Validation, type Response } from '@/presentation/protocols'
import { type UpdateProductControllerRequest } from '@/presentation/protocols/product'
import { HttpHelper } from '@/presentation/helpers'
import { type UpdateProduct } from '@/domain/usecases/product'
import { ValidationError, ProductError } from '@/domain/errors'

export class UpdateProductController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly updateProduct: UpdateProduct
  ) {}

  public handle = async(request: UpdateProductControllerRequest): Promise<Response> => {
    try {
      this.validation.validate(request)
      await this.updateProduct.update(request)
      return HttpHelper.ok({ message: 'Product successfully updated' })
    } catch (error) {
      if (error instanceof ValidationError) {
        return HttpHelper.badRequest(error)
      }
      if (error instanceof ProductError) {
        return HttpHelper.badRequest(error)
      }
      return HttpHelper.serverError(error)
    }
  }
}
