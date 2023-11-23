import { type AddCategoryRepository } from '@/application/protocols/db/dynamic/category'
import { type GetCategoriesRepository } from '@/application/protocols/db/static/category'
import { type Category } from '@/domain/models'
import { mockCategories } from '@/tests/domain/mocks'

export class AddCategoryRepositorySpy implements AddCategoryRepository {
  public input: AddCategoryRepository.Input

  public add = async(input: AddCategoryRepository.Input): Promise<void> => {
    this.input = input
  }
}

export class GetCategoriesRepositorySpy implements GetCategoriesRepository {
  public categories: Category[] = mockCategories()

  public get = async(): Promise<Category[]> => {
    return this.categories
  }
}
