import { HttpHelper } from '@/presentation/helpers'
import { type Controller, type Validation, type HttpResponse } from '@/presentation/protocols'

export class AddProductController implements Controller {
  private readonly httpHelper = new HttpHelper()

  constructor(private readonly validation: Validation) {}

  public handle = async(request: any): Promise<HttpResponse> => {
    try {
      this.validation.validate(request)
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
