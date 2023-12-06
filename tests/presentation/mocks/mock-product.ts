import { mockProduct, mockProducts } from '@/tests/domain/mocks'
import { type AddProduct, type UpdateProduct } from '@/domain/usecases/dynamic/product'
import { type GetProductsByCategory, type GetProductsWithDiscount, type GetProductBySlug, type GetLatestProducts } from '@/domain/usecases/static/product'
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

export class GetProductsByCategorySpy implements GetProductsByCategory {
  public category: string
  public page: number
  public limit: number
  public products: Product[] = mockProducts()

  public getByCategory = async(category: string, page: number, limit: number): Promise<Product[]> => {
    this.category = category
    this.page = page
    this.limit = limit
    return await Promise.resolve(this.products)
  }
}

export class GetProductsWithDiscountSpy implements GetProductsWithDiscount {
  public products: Product[] = mockProducts()

  public getWithDiscount = async(): Promise<Product[]> => {
    return await Promise.resolve(this.products)
  }
}

export class GetLatestProductsSpy implements GetLatestProducts {
  public products: Product[] = mockProducts()

  public getLatest = async(): Promise<Product[]> => {
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
