import { GetAllCategoriesRepositorySpy } from '@/tests/application/mocks'
import { throwError } from '@/tests/domain/mocks'
import { DbGetAllCategories } from '@/application/usecases/static/category'

interface Sut {
  sut: DbGetAllCategories
  getAllCategoriesRepositorySpy: GetAllCategoriesRepositorySpy
}

const makeSut = (): Sut => {
  const getAllCategoriesRepositorySpy = new GetAllCategoriesRepositorySpy()
  const sut = new DbGetAllCategories(getAllCategoriesRepositorySpy)
  return {
    sut,
    getAllCategoriesRepositorySpy
  }
}

describe('DbGetAllCategories', () => {
  test('Should call GetAllCategoriesRepository', async() => {
    const { sut, getAllCategoriesRepositorySpy } = makeSut()
    jest.spyOn(getAllCategoriesRepositorySpy, 'getAll')
    await sut.getAll()
    expect(getAllCategoriesRepositorySpy.getAll).toHaveBeenCalledTimes(1)
  })

  test('Should throw if GetAllCategoriesRepository throws', async() => {
    const { sut, getAllCategoriesRepositorySpy } = makeSut()
    jest.spyOn(getAllCategoriesRepositorySpy, 'getAll').mockImplementationOnce(throwError)
    const promise = sut.getAll()
    await expect(promise).rejects.toThrow()
  })

  test('Should return all categories on success', async() => {
    const { sut, getAllCategoriesRepositorySpy } = makeSut()
    const categories = await sut.getAll()
    expect(categories).toEqual(getAllCategoriesRepositorySpy.categories)
  })
})
