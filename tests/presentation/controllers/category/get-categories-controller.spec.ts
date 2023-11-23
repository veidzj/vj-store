import { GetCategoriesSpy } from '@/tests/presentation/mocks'
import { GetCategoriesController } from '@/presentation/controllers/category'

interface Sut {
  sut: GetCategoriesController
  getCategoriesSpy: GetCategoriesSpy
}

const makeSut = (): Sut => {
  const getCategoriesSpy = new GetCategoriesSpy()
  const sut = new GetCategoriesController(getCategoriesSpy)
  return {
    sut,
    getCategoriesSpy
  }
}

describe('GetCategoriesController', () => {
  test('Should call GetCategories', async() => {
    const { sut, getCategoriesSpy } = makeSut()
    jest.spyOn(getCategoriesSpy, 'get')
    await sut.handle({})
    expect(getCategoriesSpy.get).toHaveBeenCalledTimes(1)
  })
})
