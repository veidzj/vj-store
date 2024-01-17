import { type AddProduct, type UpdateProduct } from '@/domain/usecases/product/commands'

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
