import { type AddProductRepository } from '../protocols/db/dynamic/product'

export class AddProductRepositorySpy implements AddProductRepository {
  public input: AddProductRepository.Input

  public add = async(input: AddProductRepository.Input): Promise<void> => {
    this.input = input
  }
}
