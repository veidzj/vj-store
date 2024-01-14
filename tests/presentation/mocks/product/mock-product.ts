import { type AddProduct } from '@/domain/usecases/product/commands'

export class AddProductSpy implements AddProduct {
  public input: AddProduct.Input

  public async add(input: AddProduct.Input): Promise<void> {
    this.input = input
  }
}
