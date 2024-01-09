import { mockCategories } from '@/tests/domain/mocks/category'
import { type AddCategory } from '@/domain/usecases/category/commands'
import { type GetAllCategories } from '@/domain/usecases/category/queries'

export class AddCategorySpy implements AddCategory {
  public input: AddCategory.Input

  public async add(input: AddCategory.Input): Promise<void> {
    this.input = input
  }
}

export class GetAllCategoriesSpy implements GetAllCategories {
  public output: GetAllCategories.Output[] = mockCategories()

  public async getAll(): Promise<GetAllCategories.Output[]> {
    return this.output
  }
}
