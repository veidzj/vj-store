import MockDate from 'mockdate'

import { throwError } from '@/tests/test-helper'
import { AddCategoryRepositorySpy } from '@/tests/application/mocks/category/commands'
import { CheckCategoryByNameRepositorySpy } from '@/tests/application/mocks/category/queries'
import { mockAddCategoryInput } from '@/tests/domain/mocks/category'
import { DbAddCategory } from '@/application/usecases/category/commands'

interface Sut {
  sut: DbAddCategory
  checkCategoryByNameRepositorySpy: CheckCategoryByNameRepositorySpy
  addCategoryRepositorySpy: AddCategoryRepositorySpy
}

const makeSut = (): Sut => {
  const checkCategoryByNameRepositorySpy = new CheckCategoryByNameRepositorySpy()
  const addCategoryRepositorySpy = new AddCategoryRepositorySpy()
  const sut = new DbAddCategory(checkCategoryByNameRepositorySpy, addCategoryRepositorySpy)
  return {
    sut,
    checkCategoryByNameRepositorySpy,
    addCategoryRepositorySpy
  }
}

describe('DbAddCategory', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call CheckCategoryByNameRepositorySpy with correct name', async() => {
    const addCategoryInput = mockAddCategoryInput()
    const { sut, checkCategoryByNameRepositorySpy } = makeSut()
    await sut.add(addCategoryInput)
    expect(checkCategoryByNameRepositorySpy.name).toBe(addCategoryInput.name)
  })

  test('Should call AddCategoryRepository with correct values', async() => {
    const addCategoryInput = mockAddCategoryInput()
    const { sut, addCategoryRepositorySpy } = makeSut()
    await sut.add(addCategoryInput)
    expect(addCategoryRepositorySpy.input.id).toBeTruthy()
    expect(addCategoryRepositorySpy.input.name).toBe(addCategoryInput.name)
    expect(addCategoryRepositorySpy.input.createdAt).toEqual(new Date())
    expect(addCategoryRepositorySpy.input.updateHistory).toEqual([])
  })

  test('Should throw if AddCategoryRepository throws', async() => {
    const { sut, addCategoryRepositorySpy } = makeSut()
    jest.spyOn(addCategoryRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddCategoryInput())
    await expect(promise).rejects.toThrow()
  })
})
