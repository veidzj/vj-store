import { mockProductsOutput } from '@/tests/domain/mocks/product'
import { type CheckProductByNameRepository, type CheckProductByIdRepository, type GetLatestProductsRepository, type GetProductsWithDiscountRepository, type GetProductsByCategoryRepository } from '@/application/protocols/product/queries'
import { type ProductsRepositoryOutput } from '@/application/protocols/product/common'

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
  public output: ProductsRepositoryOutput = mockProductsOutput()

  public async getLatest(page: number, limit: number): Promise<ProductsRepositoryOutput> {
    this.page = page
    this.limit = limit
    return this.output
  }
}

export class GetProductsWithDiscountRepositorySpy implements GetProductsWithDiscountRepository {
  public page: number
  public limit: number
  public output: ProductsRepositoryOutput = mockProductsOutput()

  public async getWithDiscount(page: number, limit: number): Promise<ProductsRepositoryOutput> {
    this.page = page
    this.limit = limit
    return this.output
  }
}

export class GetProductsByCategoryRepositorySpy implements GetProductsByCategoryRepository {
  public category: string
  public page: number
  public limit: number
  public output: ProductsRepositoryOutput = mockProductsOutput()

  public async getByCategory(category: string, page: number, limit: number): Promise<ProductsRepositoryOutput> {
    this.category = category
    this.page = page
    this.limit = limit
    return this.output
  }
}
