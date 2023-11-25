import { mockProduct, mockProducts } from '@/tests/domain/mocks'
import { type UpdateProductRepository, type AddProductRepository } from '@/application/protocols/db/dynamic/product'
import { type GetAllProductsRepository, type GetProductByIdRepository } from '@/application/protocols/db/static/product'
import { type Product } from '@/domain/models'

export class GetProductByIdRepositorySpy implements GetProductByIdRepository {
  public id: string
  public output: GetProductByIdRepository.Output | null = mockProduct()

  public getById = async(id: string): Promise<GetProductByIdRepository.Output | null> => {
    this.id = id
    return this.output
  }
}

export class GetAllProductsRepositorySpy implements GetAllProductsRepository {
  public products: Product[] = mockProducts()

  public getAll = async(): Promise<Product[]> => {
    return this.products
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
