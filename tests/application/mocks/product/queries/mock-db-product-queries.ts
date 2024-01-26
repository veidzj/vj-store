import { faker } from '@faker-js/faker'

import { mockProductsOutput } from '@/tests/domain/mocks/product'
import { type CheckProductByNameRepository, type CheckProductByIdRepository, type GetLatestProductsRepository } from '@/application/protocols/product/queries'

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
