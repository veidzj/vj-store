import { mockCategoriesOutput } from '@/tests/domain/mocks/category'
import { type AddCategory, type UpdateCategory } from '@/domain/usecases/category/commands'
import { type GetAllCategories } from '@/domain/usecases/category/queries'

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

export class GetAllCategoriesSpy implements GetAllCategories {
  public output: GetAllCategories.Output[] = mockCategoriesOutput()

  public async getAll(): Promise<GetAllCategories.Output[]> {
    return this.output
  }
}
