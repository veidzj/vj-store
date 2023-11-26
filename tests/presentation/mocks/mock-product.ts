import { mockProduct, mockProducts } from '@/tests/domain/mocks'
import { type AddProduct, type UpdateProduct, type GetAllProducts, type GetProductBySlug } from '@/domain/usecases/product'
import { type Product } from '@/domain/models'

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

export class GetProductBySlugSpy implements GetProductBySlug {
  public slug: string
  public product: Product = mockProduct()

  public getBySlug = async(slug: string): Promise<Product> => {
    this.slug = slug
    return await Promise.resolve(this.product)
  }
}
