import { throwError } from '@/tests/test-helper'
import { UpdateCategoryRepositorySpy } from '@/tests/application/mocks/category/commands'
import { mockUpdateCategoryInput } from '@/tests/domain/mocks/category'
import { DbUpdateCategory } from '@/application/usecases/category/commands'
import { CheckCategoryByIdRepositorySpy } from '@/tests/application/mocks/category/queries'

interface Sut {
  sut: DbUpdateCategory
  updateCategoryRepositorySpy: UpdateCategoryRepositorySpy
  checkCategoryByIdRepositorySpy: CheckCategoryByIdRepositorySpy
}

const makeSut = (): Sut => {
  const checkCategoryByIdRepositorySpy = new CheckCategoryByIdRepositorySpy()
  const updateCategoryRepositorySpy = new UpdateCategoryRepositorySpy()
  const sut = new DbUpdateCategory(checkCategoryByIdRepositorySpy, updateCategoryRepositorySpy)
  return {
    sut,
    checkCategoryByIdRepositorySpy,
    updateCategoryRepositorySpy
  }
}

describe('DbUpdateCategory', () => {
  describe('CheckCategoryByIdRepository', () => {
    test('Should call CheckCategoryByIdRepository with correct id', async() => {
      const { sut, checkCategoryByIdRepositorySpy } = makeSut()
      const updateCategoryInput = mockUpdateCategoryInput()
      await sut.update(updateCategoryInput)
      expect(checkCategoryByIdRepositorySpy.id).toEqual(updateCategoryInput.id)
    })

    test('Should throw if CheckCategoryByIdRepository throws', async() => {
      const { sut, checkCategoryByIdRepositorySpy } = makeSut()
      jest.spyOn(checkCategoryByIdRepositorySpy, 'checkById').mockImplementationOnce(throwError)
      const promise = sut.update(mockUpdateCategoryInput())
      await expect(promise).rejects.toThrow()
    })
  })

  describe('UpdateCategoryRepository', () => {
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
})
