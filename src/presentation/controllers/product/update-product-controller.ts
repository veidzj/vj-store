import { type UpdateProduct } from '@/domain/usecases/product/commands'

export class UpdateProductController {
  constructor(private readonly updateProduct: UpdateProduct) {}

  public async handle(request: UpdateProductController.Request): Promise<void> {
    await this.updateProduct.update(request)
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
