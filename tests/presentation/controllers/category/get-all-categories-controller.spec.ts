import { GetAllCategoriesSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { GetAllCategoriesController } from '@/presentation/controllers/category'
import { HttpHelper } from '@/presentation/helpers'

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
    await sut.handle({})
    expect(getAllCategoriesSpy.getAll).toHaveBeenCalledTimes(1)
  })

  test('Should return Server Error if GetAllCategories throws', async() => {
    const { sut, getAllCategoriesSpy } = makeSut()
    jest.spyOn(getAllCategoriesSpy, 'getAll').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(HttpHelper.serverError(new Error()))
  })

  test('Should return OK on success', async() => {
    const { sut, getAllCategoriesSpy } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(HttpHelper.ok(getAllCategoriesSpy.categories))
  })
})
