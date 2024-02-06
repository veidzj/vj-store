import { mockCategoriesOutput } from '@/tests/domain/mocks/category'
import { type GetAllCategories } from '@/domain/usecases/category/queries'

export class GetAllCategoriesSpy implements GetAllCategories {
  public output: GetAllCategories.Output[] = mockCategoriesOutput()

  public async getAll(): Promise<GetAllCategories.Output[]> {
    return this.output
  }
}
