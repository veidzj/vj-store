import { type CheckCategoryByIdRepository } from '@/application/protocols/category/queries'
import { type UpdateCategoryRepository } from '@/application/protocols/category/commands'
import { Category } from '@/domain/entities/category'
import { type UpdateCategory } from '@/domain/usecases/category/commands'
import { CategoryNotFoundError } from '@/domain/errors/category'

export class DbUpdateCategory implements UpdateCategory {
  constructor(
    private readonly checkCategoryByIdRepository: CheckCategoryByIdRepository,
    private readonly updateCategoryRepository: UpdateCategoryRepository
  ) {}

  public async update(input: UpdateCategory.Input): Promise<void> {
    const category = new Category(input.name)
    const categoryExists = await this.checkCategoryByIdRepository.checkById(input.id)
    if (!categoryExists) {
      throw new CategoryNotFoundError()
    }
    const updateCategoryRepositoryInput = this.makeUpdateCategoryRepositoryInput(input.id, category)
    await this.updateCategoryRepository.update(updateCategoryRepositoryInput)
  }

  private makeUpdateCategoryRepositoryInput(id: string, category: Category): UpdateCategoryRepository.Input {
    return {
      id,
      name: category.getName(),
      updatedAt: category.getUpdatedAt()
    }
  }
}
