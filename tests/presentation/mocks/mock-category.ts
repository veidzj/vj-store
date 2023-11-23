import { type Category } from '@/domain/models'
import { type GetCategories, type AddCategory } from '@/domain/usecases/category'
import { mockCategories } from '@/tests/domain/mocks'

export class AddCategorySpy implements AddCategory {
  public input: AddCategory.Input

  public add = async(input: AddCategory.Input): Promise<void> => {
    this.input = input
  }
}

export class GetCategoriesSpy implements GetCategories {
  public categories: Category[] = mockCategories()

  public get = async(): Promise<Category[]> => {
    return await Promise.resolve(this.categories)
  }
}
