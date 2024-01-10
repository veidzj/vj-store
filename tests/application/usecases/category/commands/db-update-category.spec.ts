import MockDate from 'mockdate'

import { throwError } from '@/tests/test-helper'
import { UpdateCategoryRepositorySpy } from '@/tests/application/mocks/category/commands'
import { mockUpdateCategoryInput } from '@/tests/domain/mocks/category'
import { CheckCategoryByIdRepositorySpy } from '@/tests/application/mocks/category/queries'
import { DbUpdateCategory } from '@/application/usecases/category/commands'
import { CategoryNotFoundError } from '@/domain/errors/category'
import { CategoryFields } from '@/domain/entities/category'

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
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

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

    test('Should throw CategoryNotFoundError if CheckCategoryByIdRepository returns false', async() => {
      const { sut, checkCategoryByIdRepositorySpy } = makeSut()
      checkCategoryByIdRepositorySpy.output = false
      const promise = sut.update(mockUpdateCategoryInput())
      await expect(promise).rejects.toThrow(new CategoryNotFoundError())
    })
  })

  describe('UpdateCategoryRepository', () => {
    test('Should call UpdateCategoryRepository with correct values', async() => {
      const { sut, updateCategoryRepositorySpy } = makeSut()
      const updateCategoryInput = mockUpdateCategoryInput()
      await sut.update(updateCategoryInput)
      expect(updateCategoryRepositorySpy.input).toEqual({
        ...updateCategoryInput,
        updateHistory: {
          fields: [CategoryFields.name],
          updatedAt: new Date()
        }
      })
    })

    test('Should throw if UpdateCategoryRepository throws', async() => {
      const { sut, updateCategoryRepositorySpy } = makeSut()
      jest.spyOn(updateCategoryRepositorySpy, 'update').mockImplementationOnce(throwError)
      const promise = sut.update(mockUpdateCategoryInput())
      await expect(promise).rejects.toThrow()
    })

    test('Should not throw on success', async() => {
      const { sut } = makeSut()
      const promise = sut.update(mockUpdateCategoryInput())
      await expect(promise).resolves.not.toThrow()
    })
  })
})
