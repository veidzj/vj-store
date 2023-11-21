import { type AddCategory } from '@/domain/usecases/category'

export class AddCategorySpy implements AddCategory {
  public input: AddCategory.Input

  public add = async(input: AddCategory.Input): Promise<void> => {
    this.input = input
  }
}