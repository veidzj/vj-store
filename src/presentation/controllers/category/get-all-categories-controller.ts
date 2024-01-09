import { type GetAllCategories } from '@/domain/usecases/category/queries'

export class GetAllCategoriesController {
  constructor(private readonly getAllCategories: GetAllCategories) {}

  public async handle(): Promise<void> {
    await this.getAllCategories.getAll()
  }
}
