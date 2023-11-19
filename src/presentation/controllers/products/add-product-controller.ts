import { type Controller, type Validation, type HttpResponse } from '@/presentation/protocols'

export class AddProductController implements Controller {
  constructor(private readonly validation: Validation) {}

  public handle = async(request: any): Promise<HttpResponse> => {
    this.validation.validate(request)
    return {
      statusCode: 500,
      body: ''
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
