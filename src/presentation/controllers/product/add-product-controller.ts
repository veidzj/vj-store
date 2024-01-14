import { type AddProduct } from '@/domain/usecases/product/commands'

export class AddProductController {
  constructor(private readonly addProduct: AddProduct) {}

  public async handle(request: AddProductController.Request): Promise<void> {
    await this.addProduct.add(request)
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
