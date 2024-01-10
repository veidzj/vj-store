import { type CheckCategoryByIdRepository } from '@/application/protocols/category/queries'
import { type UpdateCategoryRepository } from '@/application/protocols/category/commands'
import { type UpdateCategory } from '@/domain/usecases/category/commands'

export class DbUpdateCategory implements UpdateCategory {
  constructor(
    private readonly checkCategoryByIdRepository: CheckCategoryByIdRepository,
    private readonly updateCategoryRepository: UpdateCategoryRepository
  ) {}

  public async update(input: UpdateCategory.Input): Promise<void> {
    await this.checkCategoryByIdRepository.checkById(input.id)
    await this.updateCategoryRepository.update(input)
  }
}
