import { type GetAllCategoriesRepository } from '@/application/protocols/category/queries'
import { type GetAllCategories } from '@/domain/usecases/category/queries'

export class DbGetAllCategories implements GetAllCategories {
  constructor(private readonly getAllCategoriesRepository: GetAllCategoriesRepository) {}

  public async getAll(): Promise<GetAllCategories.Output[]> {
    const categories = await this.getAllCategoriesRepository.getAll()
    return categories
  }
}
