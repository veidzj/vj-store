import { mockCategoriesOutput } from '@/tests/domain/mocks/category'
import { type CheckCategoryByNameRepository, type CheckCategoryByIdRepository, type GetAllCategoriesRepository } from '@/application/protocols/category/queries'

export class CheckCategoryByNameRepositorySpy implements CheckCategoryByNameRepository {
  public name: string
  public output: boolean = false

  public async checkByName(name: string): Promise<boolean> {
    this.name = name
    return this.output
  }
}

export class CheckCategoryByIdRepositorySpy implements CheckCategoryByIdRepository {
  public id: string
  public output: boolean = true

  public async checkById(id: string): Promise<boolean> {
    this.id = id
    return this.output
  }
}

export class GetAllCategoriesRepositorySpy implements GetAllCategoriesRepository {
  public output: GetAllCategoriesRepository.Output[] = mockCategoriesOutput()

  public async getAll(): Promise<GetAllCategoriesRepository.Output[]> {
    return this.output
  }
}
