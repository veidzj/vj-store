import { mockCategoriesOutput } from '@/tests/domain/mocks/category'
import { type CheckCategoryByNameRepository, type GetAllCategoriesRepository } from '@/application/protocols/category/queries'

export class CheckCategoryByNameRepositorySpy implements CheckCategoryByNameRepository {
  public name: string

  public async checkByName(name: string): Promise<boolean> {
    this.name = name
    return false
  }
}

export class GetAllCategoriesRepositorySpy implements GetAllCategoriesRepository {
  public output: GetAllCategoriesRepository.Output[] = mockCategoriesOutput()

  public async getAll(): Promise<GetAllCategoriesRepository.Output[]> {
    return this.output
  }
}
