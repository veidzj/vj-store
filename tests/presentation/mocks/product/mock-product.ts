import { faker } from '@faker-js/faker'

import { type AddProduct, type UpdateProduct } from '@/domain/usecases/product/commands'
import { type GetLatestProducts, type GetProductsWithDiscount, type GetProductsByCategory } from '@/domain/usecases/product/queries'
import { mockProductsOutput } from '@/tests/domain/mocks/product'

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
  public output: GetLatestProducts.Output = {
    products: mockProductsOutput(),
    currentPage: faker.number.int({ min: 0, max: 100 }),
    totalPages: faker.number.int({ min: 0, max: 100 }),
    totalItems: faker.number.int({ min: 0, max: 100 })
  }

  public async getLatest(page: number, limit: number): Promise<GetLatestProducts.Output> {
    this.page = page
    this.limit = limit
    return this.output
  }
}

export class GetProductsWithDiscountSpy implements GetProductsWithDiscount {
  public page: number
  public limit: number
  public output: GetProductsWithDiscount.Output = {
    products: mockProductsOutput(),
    currentPage: faker.number.int({ min: 0, max: 100 }),
    totalPages: faker.number.int({ min: 0, max: 100 }),
    totalItems: faker.number.int({ min: 0, max: 100 })
  }

  public async getWithDiscount(page: number, limit: number): Promise<GetProductsWithDiscount.Output> {
    this.page = page
    this.limit = limit
    return this.output
  }
}

export class GetProductsByCategorySpy implements GetProductsByCategory {
  public page: number
  public limit: number
  public output: GetProductsWithDiscount.Output = {
    products: mockProductsOutput(),
    currentPage: faker.number.int({ min: 0, max: 100 }),
    totalPages: faker.number.int({ min: 0, max: 100 }),
    totalItems: faker.number.int({ min: 0, max: 100 })
  }

  public async getByCategory(page: number, limit: number): Promise<GetProductsWithDiscount.Output> {
    this.page = page
    this.limit = limit
    return this.output
  }
}
