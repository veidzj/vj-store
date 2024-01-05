import MockDate from 'mockdate'

import { AddCategoryRepositorySpy } from '@/tests/application/mocks/category/commands'
import { DbAddCategory } from '@/application/usecases/category/commands'
import { mockAddCategoryInput } from '@/tests/domain/mocks/category'

interface Sut {
  sut: DbAddCategory
  addCategoryRepositorySpy: AddCategoryRepositorySpy
}

const makeSut = (): Sut => {
  const addCategoryRepositorySpy = new AddCategoryRepositorySpy()
  const sut = new DbAddCategory(addCategoryRepositorySpy)
  return {
    sut,
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

  test('Should call AddCategoryRepository with correct values', async() => {
    const addCategoryInput = mockAddCategoryInput()
    const { sut, addCategoryRepositorySpy } = makeSut()
    await sut.add(addCategoryInput)
    expect(addCategoryRepositorySpy.input.id).toBeTruthy()
    expect(addCategoryRepositorySpy.input.name).toBe(addCategoryInput.name)
    expect(addCategoryRepositorySpy.input.createdAt).toEqual(new Date())
    expect(addCategoryRepositorySpy.input.updateHistory).toEqual([])
  })
})
