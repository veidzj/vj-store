import { mockUpdateCategoryInput } from '@/tests/domain/mocks/category'
import { type UpdateCategoryRepository } from '@/application/protocols/category/commands'
import { DbUpdateCategory } from '@/application/usecases/category/commands'

describe('DbUpdateCategory', () => {
  test('Should call UpdateCategoryRepository with correct values', async() => {
    class UpdateCategoryRepositorySpy implements UpdateCategoryRepository {
      public input: UpdateCategoryRepository.Input

      public async update(input: UpdateCategoryRepository.Input): Promise<void> {
        this.input = input
      }
    }
    const updateCategoryRepositorySpy = new UpdateCategoryRepositorySpy()
    const sut = new DbUpdateCategory(updateCategoryRepositorySpy)
    const updateCategoryInput = mockUpdateCategoryInput()
    await sut.update(updateCategoryInput)
    expect(updateCategoryRepositorySpy.input).toEqual(updateCategoryInput)
  })
})
