import { mockProduct, mockProducts } from '@/tests/domain/mocks'
import { type UpdateProductRepository, type AddProductRepository } from '@/application/protocols/db/dynamic/product'
import { type CheckProductByIdRepository, type GetProductsByCategoryRepository, type GetProductBySlugRepository, type GetProductsWithDiscountRepository } from '@/application/protocols/db/static/product'

export class CheckProductByIdRepositorySpy implements CheckProductByIdRepository {
  public id: string
  public output: boolean = true

  public checkById = async(id: string): Promise<boolean> => {
    this.id = id
    return this.output
  }
}

export class GetProductsByCategoryRepositorySpy implements GetProductsByCategoryRepository {
  public category: string
  public output: GetProductsByCategoryRepository.Output = mockProducts()

  public getByCategory = async(category: string): Promise<GetProductsByCategoryRepository.Output> => {
    this.category = category
    return this.output
  }
}

export class GetProductBySlugRepositorySpy implements GetProductBySlugRepository {
  public slug: string
  public output: GetProductBySlugRepository.Output | null = mockProduct()

  public getBySlug = async(slug: string): Promise<GetProductBySlugRepository.Output | null> => {
    this.slug = slug
    return this.output
  }
}

export class GetProductsWithDiscountRepositorySpy implements GetProductsWithDiscountRepository {
  public output: GetProductsWithDiscountRepository.Output = mockProducts()

  public getWithDiscount = async(): Promise<GetProductsWithDiscountRepository.Output> => {
    return this.output
  }
}

export class AddProductRepositorySpy implements AddProductRepository {
  public input: AddProductRepository.Input

  public add = async(input: AddProductRepository.Input): Promise<void> => {
    this.input = input
  }
}

export class UpdateProductRepositorySpy implements UpdateProductRepository {
  public input: UpdateProductRepository.Input

  public update = async(input: UpdateProductRepository.Input): Promise<void> => {
    this.input = input
  }
}
