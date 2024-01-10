import { UpdateCategoryRepositorySpy } from '@/tests/application/mocks/category/commands'
import { mockUpdateCategoryInput } from '@/tests/domain/mocks/category'
import { DbUpdateCategory } from '@/application/usecases/category/commands'

interface Sut {
  sut: DbUpdateCategory
  updateCategoryRepositorySpy: UpdateCategoryRepositorySpy
}

const makeSut = (): Sut => {
  const updateCategoryRepositorySpy = new UpdateCategoryRepositorySpy()
  const sut = new DbUpdateCategory(updateCategoryRepositorySpy)
  return {
    sut,
    updateCategoryRepositorySpy
  }
}

describe('DbUpdateCategory', () => {
  test('Should call UpdateCategoryRepository with correct values', async() => {
    const { sut, updateCategoryRepositorySpy } = makeSut()
    const updateCategoryInput = mockUpdateCategoryInput()
    await sut.update(updateCategoryInput)
    expect(updateCategoryRepositorySpy.input).toEqual(updateCategoryInput)
  })
})
