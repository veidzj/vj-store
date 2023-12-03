import { type GetAllCategoriesRepository } from '@/application/protocols/db/static/category'
import { type Category } from '@/domain/models'
import { type GetAllCategories } from '@/domain/usecases/static/category'

export class DbGetAllCategories implements GetAllCategories {
  constructor(private readonly getAllCategoriesRepository: GetAllCategoriesRepository) {}

  public getAll = async(): Promise<Category[]> => {
    const categories = await this.getAllCategoriesRepository.getAll()
    return categories
  }
}
