import { throwError } from '@/tests/test-helper'
import { GetAllCategoriesSpy } from '@/tests/presentation/mocks/category'
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
    await sut.handle()
    expect(getAllCategoriesSpy.getAll).toHaveBeenCalledTimes(1)
  })

  test('Should return serverError if GetAllCategories throws', async() => {
    const { sut, getAllCategoriesSpy } = makeSut()
    jest.spyOn(getAllCategoriesSpy, 'getAll').mockImplementationOnce(throwError)
    const response = await sut.handle()
    expect(response).toEqual(HttpHelper.serverError(new Error()))
  })
})
