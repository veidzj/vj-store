import { type AddCategoryRepository, type UpdateCategoryRepository } from '@/application/protocols/category/commands'

export class AddCategoryRepositorySpy implements AddCategoryRepository {
  public input: AddCategoryRepository.Input

  public async add(input: AddCategoryRepository.Input): Promise<void> {
    this.input = input
  }
}

export class UpdateCategoryRepositorySpy implements UpdateCategoryRepository {
  public input: UpdateCategoryRepository.Input

  public async update(input: UpdateCategoryRepository.Input): Promise<void> {
    this.input = input
  }
}
