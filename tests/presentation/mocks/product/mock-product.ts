import { type AddProduct, type UpdateProduct } from '@/domain/usecases/product/commands'
import { type GetLatestProducts } from '@/domain/usecases/product/queries'

export class AddProductSpy implements AddProduct {
  public input: AddProduct.Input

  public async add(input: AddProduct.Input): Promise<void> {
    this.input = input
  }
}

export class UpdateProductSpy implements UpdateProduct {
  public input: UpdateProduct.Input

  public async update(input: UpdateProduct.Input): Promise<void> {
    this.input = input
  }
}

export class GetLatestProductsSpy implements GetLatestProducts {
  public page: number
  public limit: number
  public output: GetLatestProducts.Output

  public async getLatest(page: number, limit: number): Promise<GetLatestProducts.Output> {
    this.page = page
    this.limit = limit
    return this.output
  }
}
