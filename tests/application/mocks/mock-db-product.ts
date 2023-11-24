import { mockProduct } from '@/tests/domain/mocks'
import { type UpdateProductRepository, type AddProductRepository } from '@/application/protocols/db/dynamic/product'
import { type GetProductByIdRepository } from '@/application/protocols/db/static/product'

export class GetProductByIdRepositorySpy implements GetProductByIdRepository {
  public id: string
  public output: GetProductByIdRepository.Output | null = mockProduct()

  public getById = async(id: string): Promise<GetProductByIdRepository.Output | null> => {
    this.id = id
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
