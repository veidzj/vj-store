import { type AddProduct } from '@/domain/usecases/product/add-product'

export class AddProductSpy implements AddProduct {
  public input: AddProduct.Input

  public add = async(input: AddProduct.Input): Promise<void> => {
    this.input = input
  }
}
