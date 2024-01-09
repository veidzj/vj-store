import { GetAllCategoriesSpy } from '@/tests/presentation/mocks/category'
import { GetAllCategoriesController } from '@/presentation/controllers/category'

interface Sut {
  sut: GetAllCategoriesController
  getAllCategoriesSpy: GetAllCategoriesSpy
}

const makeSut = (): Sut => {
  const getAllCategoriesSpy = new GetAllCategoriesSpy()
  const sut = new GetAllCategoriesController(getAllCategoriesSpy)
  return {
    sut,
    getAllCategoriesSpy
  }
}

describe('GetAllCategoriesController', () => {
  test('Should call GetAllCategories', async() => {
    const { sut, getAllCategoriesSpy } = makeSut()
    jest.spyOn(getAllCategoriesSpy, 'getAll')
    await sut.handle()
    expect(getAllCategoriesSpy.getAll).toHaveBeenCalledTimes(1)
  })
})
