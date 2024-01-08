import { type AddCategoryRepository } from '@/application/protocols/category/commands'

export class AddCategoryRepositorySpy implements AddCategoryRepository {
  public input: AddCategoryRepository.Input

  public async add(input: AddCategoryRepository.Input): Promise<void> {
    this.input = input
  }
}
