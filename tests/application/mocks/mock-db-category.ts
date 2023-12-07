import { mockCategories } from '@/tests/domain/mocks'
import { type AddCategoryRepository } from '@/application/protocols/db/dynamic/category'
import { type CheckCategoryByNameRepository, type GetAllCategoriesRepository } from '@/application/protocols/db/static/category'
import { type Category } from '@/domain/models'

export class CheckCategoryByNameRepositorySpy implements CheckCategoryByNameRepository {
  public name: string
  public output: boolean = true

  public checkByName = async(name: string): Promise<boolean> => {
    this.name = name
    return this.output
  }
}

export class AddCategoryRepositorySpy implements AddCategoryRepository {
  public input: AddCategoryRepository.Input

  public add = async(input: AddCategoryRepository.Input): Promise<void> => {
    this.input = input
  }
}

export class GetAllCategoriesRepositorySpy implements GetAllCategoriesRepository {
  public categories: Category[] = mockCategories()

  public getAll = async(): Promise<Category[]> => {
    return this.categories
  }
}
