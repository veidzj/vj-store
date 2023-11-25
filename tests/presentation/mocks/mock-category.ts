import { mockCategories } from '@/tests/domain/mocks'
import { type Category } from '@/domain/models'
import { type GetAllCategories, type AddCategory } from '@/domain/usecases/category'

export class AddCategorySpy implements AddCategory {
  public input: AddCategory.Input

  public add = async(input: AddCategory.Input): Promise<void> => {
    this.input = input
  }
}

export class GetAllCategoriesSpy implements GetAllCategories {
  public categories: Category[] = mockCategories()

  public getAll = async(): Promise<Category[]> => {
    return await Promise.resolve(this.categories)
  }
}
