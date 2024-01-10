import { throwError } from '@/tests/test-helper'
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

  test('Should throw if UpdateCategoryRepository throws', async() => {
    const { sut, updateCategoryRepositorySpy } = makeSut()
    jest.spyOn(updateCategoryRepositorySpy, 'update').mockImplementationOnce(throwError)
    const promise = sut.update(mockUpdateCategoryInput())
    await expect(promise).rejects.toThrow()
  })
})
