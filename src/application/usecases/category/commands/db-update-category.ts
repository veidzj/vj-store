import { type CheckCategoryByIdRepository } from '@/application/protocols/category/queries'
import { type UpdateCategoryRepository } from '@/application/protocols/category/commands'
import { type UpdateCategory } from '@/domain/usecases/category/commands'
import { CategoryNotFoundError } from '@/domain/errors/category'

export class DbUpdateCategory implements UpdateCategory {
  constructor(
    private readonly checkCategoryByIdRepository: CheckCategoryByIdRepository,
    private readonly updateCategoryRepository: UpdateCategoryRepository
  ) {}

  public async update(input: UpdateCategory.Input): Promise<void> {
    const categoryExists = await this.checkCategoryByIdRepository.checkById(input.id)
    if (!categoryExists) {
      throw new CategoryNotFoundError()
    }
    await this.updateCategoryRepository.update(input)
  }
}
