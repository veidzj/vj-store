import { mockUpdateCategoryInput } from '@/tests/domain/mocks/category'
import { UpdateCategoryController } from '@/presentation/controllers/category/update-category-controller'
import { type UpdateCategory } from '@/domain/usecases/category/commands'

const mockRequest = (): UpdateCategoryController.Request => mockUpdateCategoryInput()

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
    const request = mockRequest()
    await sut.handle(request)
    expect(updateCategorySpy.input).toEqual(request)
  })
})
