import { GetCategoriesRepositorySpy } from '@/tests/application/mocks'
import { DbGetCategories } from '@/application/usecases/category'

interface Sut {
  sut: DbGetCategories
  getCategoriesRepositorySpy: GetCategoriesRepositorySpy
}

const makeSut = (): Sut => {
  const getCategoriesRepositorySpy = new GetCategoriesRepositorySpy()
  const sut = new DbGetCategories(getCategoriesRepositorySpy)
  return {
    sut,
    getCategoriesRepositorySpy
  }
}

describe('DbGetCategories', () => {
  test('Should call GetCategoriesRepository', async() => {
    const { sut, getCategoriesRepositorySpy } = makeSut()
    jest.spyOn(getCategoriesRepositorySpy, 'get')
    await sut.get()
    expect(getCategoriesRepositorySpy.get).toHaveBeenCalledTimes(1)
  })
})
