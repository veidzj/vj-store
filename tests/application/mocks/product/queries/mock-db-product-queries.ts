import { faker } from '@faker-js/faker'

import { mockProductsOutput } from '@/tests/domain/mocks/product'
import { type CheckProductByNameRepository, type CheckProductByIdRepository, type GetLatestProductsRepository, type GetProductsWithDiscountRepository, type GetProductsByCategoryRepository } from '@/application/protocols/product/queries'

export class CheckProductByNameRepositorySpy implements CheckProductByNameRepository {
  public name: string
  public output: boolean = false

  public async checkByName(name: string): Promise<boolean> {
    this.name = name
    return this.output
  }
}

export class CheckProductByIdRepositorySpy implements CheckProductByIdRepository {
  public id: string
  public output: boolean = true

  public async checkById(id: string): Promise<boolean> {
    this.id = id
    return this.output
  }
}

export class GetLatestProductsRepositorySpy implements GetLatestProductsRepository {
  public page: number
  public limit: number
  public output: GetLatestProductsRepository.Output = {
    products: mockProductsOutput(),
    currentPage: faker.number.int({ min: 0, max: 100 }),
    totalPages: faker.number.int({ min: 0, max: 100 }),
    totalItems: faker.number.int({ min: 0, max: 100 })
  }

  public async getLatest(page: number, limit: number): Promise<GetLatestProductsRepository.Output> {
    this.page = page
    this.limit = limit
    return this.output
  }
}

export class GetProductsWithDiscountRepositorySpy implements GetProductsWithDiscountRepository {
  public page: number
  public limit: number
  public output: GetProductsWithDiscountRepository.Output = {
    products: mockProductsOutput(),
    currentPage: faker.number.int({ min: 0, max: 100 }),
    totalPages: faker.number.int({ min: 0, max: 100 }),
    totalItems: faker.number.int({ min: 0, max: 100 })
  }

  public async getWithDiscount(page: number, limit: number): Promise<GetProductsWithDiscountRepository.Output> {
    this.page = page
    this.limit = limit
    return this.output
  }
}

export class GetProductsByCategoryRepositorySpy implements GetProductsByCategoryRepository {
  public page: number
  public limit: number
  public output: GetProductsByCategoryRepository.Output = {
    products: mockProductsOutput(),
    currentPage: faker.number.int({ min: 0, max: 100 }),
    totalPages: faker.number.int({ min: 0, max: 100 }),
    totalItems: faker.number.int({ min: 0, max: 100 })
  }

  public async getByCategory(page: number, limit: number): Promise<GetProductsByCategoryRepository.Output> {
    this.page = page
    this.limit = limit
    return this.output
  }
}
