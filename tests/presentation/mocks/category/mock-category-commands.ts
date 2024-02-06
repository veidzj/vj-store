import { type AddCategory, type UpdateCategory } from '@/domain/usecases/category/commands'

export class AddCategorySpy implements AddCategory {
  public input: AddCategory.Input

  public async add(input: AddCategory.Input): Promise<void> {
    this.input = input
  }
}

export class UpdateCategorySpy implements UpdateCategory {
  public input: UpdateCategory.Input

  public async update(input: UpdateCategory.Input): Promise<void> {
    this.input = input
  }
}
