import { UpdateCategoryController } from '@/presentation/controllers/category/update-category-controller'
import { type UpdateCategory } from '@/domain/usecases/category/commands'

describe('UpdateCategoryController', () => {
  test('Should call UpdateCategory with correct values', async() => {
    class UpdateCategorySpy implements UpdateCategory {
      public input: UpdateCategory.Input

      public async update(input: UpdateCategory.Input): Promise<void> {
        this.input = input
      }
    }
    const updateCategorySpy = new UpdateCategorySpy()
    const sut = new UpdateCategoryController(updateCategorySpy)
    await sut.handle({
      id: 'anyId',
      name: 'anyName'
    })
    expect(updateCategorySpy.input).toEqual({
      id: 'anyId',
      name: 'anyName'
    })
  })
})
