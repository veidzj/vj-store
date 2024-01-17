import { type Controller, type Response } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type AddProduct } from '@/domain/usecases/product/commands'
import { EntityValidationError } from '@/domain/errors'
import { ProductAlreadyExistsError } from '@/domain/errors/product'
import { CategoryNotFoundError } from '@/domain/errors/category'

export class AddProductController implements Controller {
  constructor(private readonly addProduct: AddProduct) {}

  public async handle(request: AddProductController.Request): Promise<Response> {
    try {
      await this.addProduct.add(request)
      return HttpHelper.ok({ message: 'Product successfully added' })
    } catch (error) {
      if (error instanceof EntityValidationError) {
        return HttpHelper.badRequest(error)
      }
      if (error instanceof ProductAlreadyExistsError) {
        return HttpHelper.conflict(error)
      }
      if (error instanceof CategoryNotFoundError) {
        return HttpHelper.notFound(error)
      }
      return HttpHelper.serverError(error as Error)
    }
  }
}

export namespace AddProductController {
  export interface Request {
    name: string
    description: string
    price: number
    discountPercentage: number
    quantity: number
    category: string
    imagesUrls: string[]
  }
}
