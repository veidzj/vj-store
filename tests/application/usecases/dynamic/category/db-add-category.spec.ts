import { AddCategoryRepositorySpy } from '@/tests/application/mocks'
import { mockAddCategoryInput, throwError } from '@/tests/domain/mocks'
import { DbAddCategory } from '@/application/usecases/dynamic/category'

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

  test('Should throw if AddCategoryRepository throws', async() => {
    const { sut, addCategoryRepositorySpy } = makeSut()
    jest.spyOn(addCategoryRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddCategoryInput())
    await expect(promise).rejects.toThrow()
  })

  test('Should not throw on success', async() => {
    const { sut } = makeSut()
    const promise = sut.add(mockAddCategoryInput())
    await expect(promise).resolves.not.toThrow()
  })
})
