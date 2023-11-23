import { GetCategoriesSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { GetCategoriesController } from '@/presentation/controllers/category'
import { HttpHelper } from '@/presentation/helpers'

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
  const httpHelper = new HttpHelper()

  test('Should call GetCategories', async() => {
    const { sut, getCategoriesSpy } = makeSut()
    jest.spyOn(getCategoriesSpy, 'get')
    await sut.handle({})
    expect(getCategoriesSpy.get).toHaveBeenCalledTimes(1)
  })

  test('Should return Server Error if GetCategories throws', async() => {
    const { sut, getCategoriesSpy } = makeSut()
    jest.spyOn(getCategoriesSpy, 'get').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(httpHelper.serverError(new Error()))
  })

  test('Should return OK on success', async() => {
    const { sut, getCategoriesSpy } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(httpHelper.ok(getCategoriesSpy.categories))
  })
})
