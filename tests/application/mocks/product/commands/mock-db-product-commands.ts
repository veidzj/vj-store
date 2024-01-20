import { type AddProductRepository, type UpdateProductRepository } from '@/application/protocols/product/commands'

export class AddProductRepositorySpy implements AddProductRepository {
  public input: AddProductRepository.Input

  public async add(input: AddProductRepository.Input): Promise<void> {
    this.input = input
  }
}

export class UpdateProductRepositorySpy implements UpdateProductRepository {
  public input: UpdateProductRepository.Input

  public async update(input: UpdateProductRepository.Input): Promise<void> {
    this.input = input
  }
}
