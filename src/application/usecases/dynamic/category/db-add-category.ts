import { type AddCategoryRepository } from '@/application/protocols/db/dynamic/category'
import { type AddCategory } from '@/domain/usecases/dynamic/category'

export class DbAddCategory implements AddCategory {
  constructor(private readonly addCategoryRepository: AddCategoryRepository) {}

  public add = async(input: AddCategory.Input): Promise<void> => {
    await this.addCategoryRepository.add(input)
  }
}
