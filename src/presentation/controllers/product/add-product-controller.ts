import { type Controller, type Validation, type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type AddProduct } from '@/domain/usecases/product/add-product'

export class AddProductController implements Controller {
  private readonly httpHelper = new HttpHelper()

  constructor(
    private readonly validation: Validation,
    private readonly addProduct: AddProduct
  ) {}

  public handle = async(request: any): Promise<HttpResponse> => {
    try {
      this.validation.validate(request)

      const { name, description, price, discountPercentage, category, imageUrls, quantity } = request
      await this.addProduct.add({ name, description, price, discountPercentage, category, imageUrls, quantity })
      return {
        statusCode: 500,
        body: ''
      }
    } catch (error) {
      return this.httpHelper.badRequest(error)
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
