import { type GetCategoriesRepository } from '@/application/protocols/db/static/category'
import { type Category } from '@/domain/models'
import { type GetCategories } from '@/domain/usecases/category'

export class DbGetCategories implements GetCategories {
  constructor(private readonly getCategoriesRepository: GetCategoriesRepository) {}

  public get = async(): Promise<Category[]> => {
    const categories = await this.getCategoriesRepository.get()
    return categories
  }
}
