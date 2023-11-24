import { type AddProduct, type UpdateProduct } from '@/domain/usecases/product'

export class AddProductSpy implements AddProduct {
  public input: AddProduct.Input

  public add = async(input: AddProduct.Input): Promise<void> => {
    this.input = input
  }
}

export class UpdateProductSpy implements UpdateProduct {
  public input: UpdateProduct.Input

  public update = async(input: UpdateProduct.Input): Promise<void> => {
    this.input = input
  }
}
