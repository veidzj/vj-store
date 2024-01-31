import { mockProductOutput, mockProductsOutput } from '@/tests/domain/mocks/product'
import { type ProductOutput, type ProductsOutput } from '@/domain/entities/product/dto'
import { type AddProduct, type UpdateProduct } from '@/domain/usecases/product/commands'
import { type GetLatestProducts, type GetProductsWithDiscount, type GetProductsByCategory, type GetProductBySlug } from '@/domain/usecases/product/queries'

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
  public output: ProductsOutput = mockProductsOutput()

  public async getLatest(page: number, limit: number): Promise<ProductsOutput> {
    this.page = page
    this.limit = limit
    return this.output
  }
}

export class GetProductsWithDiscountSpy implements GetProductsWithDiscount {
  public page: number
  public limit: number
  public output: ProductsOutput = mockProductsOutput()

  public async getWithDiscount(page: number, limit: number): Promise<ProductsOutput> {
    this.page = page
    this.limit = limit
    return this.output
  }
}

export class GetProductsByCategorySpy implements GetProductsByCategory {
  public category: string
  public page: number
  public limit: number
  public output: ProductsOutput = mockProductsOutput()

  public async getByCategory(category: string, page: number, limit: number): Promise<ProductsOutput> {
    this.category = category
    this.page = page
    this.limit = limit
    return this.output
  }
}

export class GetProductBySlugSpy implements GetProductBySlug {
  public slug: string
  public output: ProductOutput = mockProductOutput()

  public async getBySlug(slug: string): Promise<ProductOutput> {
    this.slug = slug
    return this.output
  }
}
