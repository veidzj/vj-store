import { GetAllCategoriesRepositorySpy } from '@/tests/application/mocks/category/queries'
import { DbGetAllCategories } from '@/application/usecases/category/queries'

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
})
