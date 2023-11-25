import { type AddProduct, type UpdateProduct, type GetAllProducts } from '@/domain/usecases/product'
import { type Product } from '@/domain/models'
import { mockProducts } from '@/tests/domain/mocks'

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

export class GetAllProductsSpy implements GetAllProducts {
  public products: Product[] = mockProducts()

  public getAll = async(): Promise<Product[]> => {
    return await Promise.resolve(this.products)
  }
}
