import { type CheckCategoryByNameRepository } from '@/application/protocols/category/queries'
import { type AddCategoryRepository } from '@/application/protocols/category/commands'
import { Category } from '@/domain/entities/category'
import { type AddCategory } from '@/domain/usecases/category'

export class DbAddCategory implements AddCategory {
  constructor(
    private readonly checkCategoryByNameRepository: CheckCategoryByNameRepository,
    private readonly addCategoryRepository: AddCategoryRepository
  ) {}

  public async add(input: AddCategory.Input): Promise<void> {
    const category = new Category(input.name)
    await this.checkCategoryByNameRepository.checkByName(category.getName())
    const addCategoryRepositoryInput = this.makeAddAccountRepositoryInput(category)
    await this.addCategoryRepository.add(addCategoryRepositoryInput)
  }

  private makeAddAccountRepositoryInput(category: Category): AddCategoryRepository.Input {
    return {
      id: category.getId(),
      name: category.getName(),
      createdAt: category.getCreatedAt(),
      updateHistory: []
    }
  }
}
