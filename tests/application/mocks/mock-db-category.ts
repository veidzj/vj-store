import { type AddCategoryRepository } from '@/application/protocols/db/dynamic/category'

export class AddCategoryRepositorySpy implements AddCategoryRepository {
  public input: AddCategoryRepository.Input

  public add = async(input: AddCategoryRepository.Input): Promise<void> => {
    this.input = input
  }
}
