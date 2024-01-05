import { type AddCategory } from '@/domain/usecases/category'

export class AddCategorySpy implements AddCategory {
  public name: string

  public async add(name: string): Promise<void> {
    this.name = name
  }
}
