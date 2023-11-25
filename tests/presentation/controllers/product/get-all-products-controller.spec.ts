import { GetAllProductsSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { GetAllProductsController } from '@/presentation/controllers/product'
import { HttpHelper } from '@/presentation/helpers'

interface Sut {
  sut: GetAllProductsController
  getAllProductsSpy: GetAllProductsSpy
}

const makeSut = (): Sut => {
  const getAllProductsSpy = new GetAllProductsSpy()
  const sut = new GetAllProductsController(getAllProductsSpy)
  return {
    sut,
    getAllProductsSpy
  }
}

describe('GetAllProductsController', () => {
  test('Should call GetAllProducts', async() => {
    const { sut, getAllProductsSpy } = makeSut()
    jest.spyOn(getAllProductsSpy, 'getAll')
    await sut.handle({})
    expect(getAllProductsSpy.getAll).toHaveBeenCalledTimes(1)
  })

  test('Should return Server Error if GetAllProducts throws', async() => {
    const { sut, getAllProductsSpy } = makeSut()
    jest.spyOn(getAllProductsSpy, 'getAll').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(HttpHelper.serverError(new Error()))
  })
})
