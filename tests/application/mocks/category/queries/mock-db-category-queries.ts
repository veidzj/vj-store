import { type CheckCategoryByNameRepository } from '@/application/protocols/category/queries'

export class CheckCategoryByNameRepositorySpy implements CheckCategoryByNameRepository {
  public name: string

  public async checkByName(name: string): Promise<boolean> {
    this.name = name
    return false
  }
}
