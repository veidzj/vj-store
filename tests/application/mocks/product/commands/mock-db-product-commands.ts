import { type AddProductRepository } from '@/application/protocols/product/commands'

export class AddProductRepositorySpy implements AddProductRepository {
  public input: AddProductRepository.Input

  public async add(input: AddProductRepository.Input): Promise<void> {
    this.input = input
  }
}
