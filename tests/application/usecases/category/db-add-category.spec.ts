import { AddCategoryRepositorySpy } from '@/tests/application/mocks'
import { mockAddCategoryInput } from '@/tests/domain/mocks'
import { DbAddCategory } from '@/application/usecases/category'

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
  test('Should call AddCategoryRepository with correct values', async() => {
    const { sut, addCategoryRepositorySpy } = makeSut()
    const addCategoryInput = mockAddCategoryInput()
    await sut.add(addCategoryInput)
    expect(addCategoryRepositorySpy.input).toEqual(addCategoryInput)
  })
})
